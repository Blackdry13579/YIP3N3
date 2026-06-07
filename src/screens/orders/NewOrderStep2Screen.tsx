import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { FishPrice } from '../../lib/supabase';

export function NewOrderStep2Screen({ navigation, route }: any) {
  const { priceId, prices } = route.params as { priceId: string; prices: FishPrice[] };
  const price = prices.find((p: FishPrice) => p.id === priceId)!;
  const [quantity, setQuantity] = useState(1);

  const total = price.amount * quantity;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle commande</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Steps */}
      <View style={styles.steps}>
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <View style={[styles.stepCircle, s <= 2 && styles.stepDone, s === 2 && styles.stepActive]}>
              {s < 2
                ? <Ionicons name="checkmark" size={14} color={Colors.textPrimary} />
                : <Text style={[styles.stepNum, s === 2 && styles.stepNumActive]}>{s}</Text>
              }
            </View>
            {s < 3 && <View style={[styles.stepLine, s < 2 && styles.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Quantité</Text>
        <Text style={styles.subtitle}>Combien de poissons pour cette commande ?</Text>

        {/* Prix sélectionné */}
        <View style={styles.selectedPrice}>
          <Ionicons name="fish-outline" size={20} color={Colors.orange} />
          <Text style={styles.selectedPriceText}>{price.amount.toLocaleString('fr-FR')} FCFA / poisson</Text>
        </View>

        {/* Quantity picker */}
        <View style={styles.picker}>
          <TouchableOpacity
            style={[styles.pickerBtn, quantity <= 1 && styles.pickerBtnDisabled]}
            onPress={() => setQuantity(q => Math.max(1, q - 1))}
          >
            <Ionicons name="remove" size={24} color={quantity <= 1 ? Colors.textMuted : Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.pickerBtn} onPress={() => setQuantity(q => q + 1)}>
            <Ionicons name="add" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Total preview */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total estimé</Text>
          <Text style={styles.totalAmount}>{total.toLocaleString('fr-FR')} FCFA</Text>
          <Text style={styles.totalSub}>{quantity} × {price.amount.toLocaleString('fr-FR')} FCFA</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Continuer"
          onPress={() => navigation.navigate('NewOrderStep3', { priceId, prices, quantity })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, paddingTop: 56, backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  steps: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 20, backgroundColor: Colors.bgCard, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  stepCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.bgInput, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  stepDone: { backgroundColor: Colors.greenDark, borderColor: Colors.green },
  stepActive: { backgroundColor: Colors.orange, borderColor: Colors.orange },
  stepNum: { fontSize: 13, fontWeight: '700', color: Colors.textMuted },
  stepNumActive: { color: Colors.textPrimary },
  stepLine: { width: 40, height: 2, backgroundColor: Colors.border },
  stepLineDone: { backgroundColor: Colors.orange },
  content: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  selectedPrice: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.bgCard, borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: Colors.orange + '44', marginBottom: 32,
  },
  selectedPriceText: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  picker: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 32 },
  pickerBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  pickerBtnDisabled: { opacity: 0.4 },
  quantityText: { fontSize: 52, fontWeight: '800', color: Colors.textPrimary, minWidth: 70, textAlign: 'center' },
  totalCard: {
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 20,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border, gap: 4,
  },
  totalLabel: { fontSize: 13, color: Colors.textSecondary },
  totalAmount: { fontSize: 28, fontWeight: '800', color: Colors.orange },
  totalSub: { fontSize: 12, color: Colors.textMuted },
  footer: { padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
});
