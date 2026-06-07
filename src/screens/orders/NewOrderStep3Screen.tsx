import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { FishPrice } from '../../lib/supabase';

function generateRef(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function NewOrderStep3Screen({ navigation, route }: any) {
  const { priceId, prices, quantity } = route.params as { priceId: string; prices: FishPrice[]; quantity: number };
  const price = prices.find((p: FishPrice) => p.id === priceId)!;
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const total = price.amount * quantity;

  const handleCreate = async () => {
    setLoading(true);
    const ref = generateRef();
    // TODO: insert into supabase orders + order_items
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigation.navigate('OrderSuccess', {
      order: {
        reference: ref,
        total_amount: total,
        created_at: new Date().toISOString(),
        client_phone: phone || undefined,
        items: [{ quantity, unit_price: price.amount, line_total: total }],
      },
    });
  };

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
            <View style={[styles.stepCircle, s < 3 && styles.stepDone, s === 3 && styles.stepActive]}>
              {s < 3
                ? <Ionicons name="checkmark" size={14} color={Colors.textPrimary} />
                : <Text style={styles.stepNumActive}>{s}</Text>
              }
            </View>
            {s < 3 && <View style={styles.stepLineDone} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Téléphone client</Text>
        <Text style={styles.subtitle}>Facultatif — uniquement pour paiement mobile money</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="call-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Ex: 70 12 34 56"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>

        {/* Résumé */}
        <Text style={styles.resumeTitle}>Résumé de la commande</Text>
        <View style={styles.resumeCard}>
          <View style={styles.resumeRow}>
            <Text style={styles.resumeLabel}>Poisson</Text>
            <Text style={styles.resumeValue}>{price.amount.toLocaleString('fr-FR')} FCFA</Text>
          </View>
          <View style={styles.resumeRow}>
            <Text style={styles.resumeLabel}>Quantité</Text>
            <Text style={styles.resumeValue}>{quantity}</Text>
          </View>
          {phone ? (
            <View style={styles.resumeRow}>
              <Text style={styles.resumeLabel}>Téléphone</Text>
              <Text style={styles.resumeValue}>{phone}</Text>
            </View>
          ) : null}
          <View style={styles.divider} />
          <View style={styles.resumeRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total.toLocaleString('fr-FR')} FCFA</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Créer la commande" onPress={handleCreate} loading={loading} />
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
  stepNumActive: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  stepLineDone: { width: 40, height: 2, backgroundColor: Colors.orange },
  content: { padding: 24 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 20 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgInput, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: 12, height: 50, marginBottom: 28,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
  resumeTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  resumeCard: {
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: Colors.border, gap: 12,
  },
  resumeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resumeLabel: { fontSize: 14, color: Colors.textSecondary },
  resumeValue: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.border },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  totalValue: { fontSize: 18, fontWeight: '800', color: Colors.orange },
  footer: { padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
});
