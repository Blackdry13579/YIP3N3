import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { mockPrices } from '../../lib/mockData';
import { FishPrice } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

type OrderLine = {
  priceId: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

function genRef() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function NewOrderScreen({ navigation }: any) {
  const { user } = useAuth();
  const activePrices = mockPrices.filter(p => p.active);

  const [selectedPrice, setSelectedPrice] = useState<FishPrice>(activePrices[0]);
  const [quantity, setQuantity] = useState(1);
  const [showPicker, setShowPicker] = useState(false);
  const [showAddForm, setShowAddForm] = useState(true);
  const [lines, setLines] = useState<OrderLine[]>([]);
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'sur_place' | 'a_emporter'>('sur_place');

  const total = lines.reduce((s, l) => s + l.lineTotal, 0);

  const handleValider = () => {
    if (!selectedPrice) return;
    const idx = lines.findIndex(l => l.priceId === selectedPrice.id);
    if (idx >= 0) {
      setLines(lines.map((l, i) =>
        i === idx
          ? { ...l, quantity: l.quantity + quantity, lineTotal: l.unitPrice * (l.quantity + quantity) }
          : l
      ));
    } else {
      setLines(prev => [...prev, {
        priceId: selectedPrice.id,
        unitPrice: selectedPrice.amount,
        quantity,
        lineTotal: selectedPrice.amount * quantity,
      }]);
    }
    setQuantity(1);
    setShowAddForm(false);
  };

  const handleRemoveLine = (idx: number) => {
    const updated = lines.filter((_, i) => i !== idx);
    setLines(updated);
    if (updated.length === 0) setShowAddForm(true);
  };

  const handleReset = () => {
    setLines([]);
    setPhone('');
    setMode('sur_place');
    setQuantity(1);
    setSelectedPrice(activePrices[0]);
    setShowAddForm(true);
  };

  const handleCreate = () => {
    if (lines.length === 0) return;
    navigation.navigate('OrderSuccess', {
      order: {
        id: Date.now().toString(),
        reference: genRef(),
        server_id: user?.id ?? '2',
        server_name: user?.full_name ?? '',
        client_phone: phone || undefined,
        mode,
        status: 'en_cours',
        total_amount: total,
        created_at: new Date().toISOString(),
        items: lines.map((l, i) => ({
          id: i.toString(),
          order_id: '0',
          fish_price_id: l.priceId,
          quantity: l.quantity,
          unit_price: l.unitPrice,
          line_total: l.lineTotal,
        })),
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle commande</Text>
        <TouchableOpacity onPress={handleReset}>
          <Ionicons name="trash-outline" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Formulaire ajout produit (si pas encore de lignes) ── */}
        {showAddForm && lines.length === 0 && (
          <View style={styles.addCard}>
            <Text style={styles.sectionTitle}>Ajouter des produits</Text>
            <View style={styles.addRow}>
              <View style={styles.colPrice}>
                <Text style={styles.addLabel}>Prix du poisson</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowPicker(true)}>
                  <Text style={styles.dropdownText}>
                    {selectedPrice?.amount.toLocaleString('fr-FR')} FCFA
                  </Text>
                  <Ionicons name="chevron-down" size={13} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <View style={styles.colQty}>
                <Text style={styles.addLabel}>Quantité</Text>
                <View style={styles.stepper}>
                  <TouchableOpacity style={styles.stepBtn} onPress={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Ionicons name="remove" size={15} color={Colors.textPrimary} />
                  </TouchableOpacity>
                  <Text style={styles.stepVal}>{quantity}</Text>
                  <TouchableOpacity style={styles.stepBtn} onPress={() => setQuantity(q => q + 1)}>
                    <Ionicons name="add" size={15} color={Colors.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.validerBtn} onPress={handleValider}>
                <Text style={styles.validerBtnText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Lignes de commande ── */}
        {lines.length > 0 && (
          <View style={styles.linesCard}>
            <Text style={styles.sectionTitle}>Lignes de commande</Text>
            {lines.map((line, i) => (
              <View key={i} style={[styles.lineRow, i > 0 && styles.lineRowBorder]}>
                <View style={styles.lineLeft}>
                  <Text style={styles.linePrice}>{line.unitPrice.toLocaleString('fr-FR')} FCFA</Text>
                  <Text style={styles.lineQty}> × {line.quantity}</Text>
                </View>
                <View style={styles.lineRight}>
                  <Text style={styles.lineTotal}>{line.lineTotal.toLocaleString('fr-FR')} FCFA</Text>
                  <TouchableOpacity style={styles.trashBtn} onPress={() => handleRemoveLine(i)}>
                    <Ionicons name="trash-outline" size={17} color={Colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── Ajouter produit — entre les lignes et le total ── */}
        {lines.length > 0 && (
          showAddForm ? (
            <View style={styles.addCard}>
              <View style={styles.addRow}>
                <View style={styles.colPrice}>
                  <Text style={styles.addLabel}>Prix du poisson</Text>
                  <TouchableOpacity style={styles.dropdown} onPress={() => setShowPicker(true)}>
                    <Text style={styles.dropdownText}>
                      {selectedPrice?.amount.toLocaleString('fr-FR')} FCFA
                    </Text>
                    <Ionicons name="chevron-down" size={13} color={Colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.colQty}>
                  <Text style={styles.addLabel}>Quantité</Text>
                  <View style={styles.stepper}>
                    <TouchableOpacity style={styles.stepBtn} onPress={() => setQuantity(q => Math.max(1, q - 1))}>
                      <Ionicons name="remove" size={15} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.stepVal}>{quantity}</Text>
                    <TouchableOpacity style={styles.stepBtn} onPress={() => setQuantity(q => q + 1)}>
                      <Ionicons name="add" size={15} color={Colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.validerBtn} onPress={handleValider}>
                  <Text style={styles.validerBtnText}>Valider</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.addAnotherBlock} onPress={() => setShowAddForm(true)} activeOpacity={0.85}>
              <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.addAnotherBlockText}>Ajouter un autre poisson</Text>
            </TouchableOpacity>
          )
        )}

        {/* ── Total ── */}
        {lines.length > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>{total.toLocaleString('fr-FR')} FCFA</Text>
          </View>
        )}

        {/* ── Numéro de dépôt client ── */}
        <Text style={styles.sectionTitle}>Numéro de dépôt client (optionnel)</Text>
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Numéro</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Ex : DEP-001"
            keyboardType="default"
            placeholderTextColor={Colors.textMuted}
          />
        </View>

        {/* ── Mode de commande ── */}
        <Text style={styles.sectionTitle}>Mode de commande</Text>
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'sur_place' && styles.modeBtnActive]}
            onPress={() => setMode('sur_place')}
          >
            <Text style={[styles.modeBtnText, mode === 'sur_place' && styles.modeBtnTextActive]}>
              Sur place
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, mode === 'a_emporter' && styles.modeBtnActive]}
            onPress={() => setMode('a_emporter')}
          >
            <Text style={[styles.modeBtnText, mode === 'a_emporter' && styles.modeBtnTextActive]}>
              À emporter
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Créer la commande ── */}
        <TouchableOpacity
          style={[styles.createBtn, lines.length === 0 && styles.createBtnDisabled]}
          onPress={handleCreate}
          disabled={lines.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.createBtnText}>Créer la commande</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Price picker modal */}
      <Modal visible={showPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowPicker(false)}
          activeOpacity={1}
        >
          <View style={styles.pickerBox}>
            <Text style={styles.pickerTitle}>Prix du poisson</Text>
            {activePrices.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[styles.pickerItem, selectedPrice?.id === p.id && styles.pickerItemActive]}
                onPress={() => { setSelectedPrice(p); setShowPicker(false); }}
              >
                <Text style={[
                  styles.pickerItemText,
                  selectedPrice?.id === p.id && styles.pickerItemTextActive,
                ]}>
                  {p.amount.toLocaleString('fr-FR')} FCFA
                </Text>
                {selectedPrice?.id === p.id && (
                  <Ionicons name="checkmark" size={18} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16,
    backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  content: { padding: 16, gap: 14, paddingBottom: 40 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, marginBottom: -6 },

  // Add form card
  addCard: {
    backgroundColor: Colors.bgCard, borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: Colors.border, gap: 12,
  },
  addRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },

  colPrice: { flex: 1 },
  colQty: { width: 96 },

  addLabel: { fontSize: 11, color: Colors.textMuted, marginBottom: 5 },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: Colors.border, borderRadius: 8,
    paddingHorizontal: 9, paddingVertical: 9, backgroundColor: Colors.bg,
  },
  dropdownText: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },

  stepper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border, borderRadius: 8,
    overflow: 'hidden', backgroundColor: Colors.bg,
  },
  stepBtn: {
    width: 30, height: 36, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.bgCardLight,
  },
  stepVal: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, width: 28, textAlign: 'center' },

  validerBtn: {
    backgroundColor: Colors.primary, borderRadius: 8,
    paddingHorizontal: 14, paddingVertical: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  validerBtnText: { color: Colors.textOnDark, fontWeight: '700', fontSize: 13 },

  // "Ajouter un autre poisson" block
  addAnotherBlock: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12, paddingVertical: 14,
    borderWidth: 1, borderColor: Colors.primary + '40',
  },
  addAnotherBlockText: { fontSize: 14, fontWeight: '700', color: Colors.primary },

  // Lines card
  linesCard: {
    backgroundColor: Colors.bgCard, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: Colors.border, gap: 0,
  },

  lineRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10,
  },
  lineRowBorder: { borderTopWidth: 1, borderTopColor: Colors.separator },

  lineLeft: { flexDirection: 'row', alignItems: 'baseline', flex: 1 },
  linePrice: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  lineQty: { fontSize: 13, color: Colors.textSecondary, marginLeft: 4 },

  lineRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  lineTotal: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  trashBtn: { padding: 2 },

  totalCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.bgCard, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 1, borderColor: Colors.border,
  },
  totalLabel: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  totalValue: { fontSize: 22, fontWeight: '900', color: Colors.accent },

  // Client info
  inputCard: {
    backgroundColor: Colors.bgCard, borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: Colors.border,
  },
  inputLabel: { fontSize: 11, color: Colors.textMuted, marginBottom: 6 },
  input: {
    fontSize: 15, color: Colors.textPrimary,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    paddingVertical: 6,
  },

  // Mode
  modeRow: { flexDirection: 'row', gap: 12 },
  modeBtn: {
    flex: 1, paddingVertical: 13, borderRadius: 8,
    borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', backgroundColor: Colors.bgCard,
  },
  modeBtnActive: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  modeBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  modeBtnTextActive: { color: Colors.primary },

  // Create
  createBtn: {
    backgroundColor: Colors.primary, borderRadius: 10,
    paddingVertical: 16, alignItems: 'center',
  },
  createBtnDisabled: { backgroundColor: Colors.textMuted },
  createBtnText: { fontSize: 16, fontWeight: '800', color: Colors.textOnDark },

  // Modal
  overlay: {
    flex: 1, backgroundColor: Colors.overlay,
    justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  pickerBox: {
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16,
    width: '100%', gap: 4,
  },
  pickerTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  pickerItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 13, paddingHorizontal: 12, borderRadius: 8,
  },
  pickerItemActive: { backgroundColor: Colors.primaryLight },
  pickerItemText: { fontSize: 16, color: Colors.textSecondary, fontWeight: '600' },
  pickerItemTextActive: { color: Colors.primary, fontWeight: '800' },
});
