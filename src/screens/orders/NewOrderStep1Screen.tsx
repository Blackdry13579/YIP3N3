import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { mockPrices } from '../../lib/mockData';

export function NewOrderStep1Screen({ navigation }: any) {
  const [selected, setSelected] = useState<string | null>(null);
  const activePrices = mockPrices.filter(p => p.active);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle commande</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.steps}>
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <View style={[styles.stepCircle, s === 1 && styles.stepActive]}>
              <Text style={[styles.stepNum, s === 1 && styles.stepNumActive]}>{s}</Text>
            </View>
            {s < 3 && <View style={[styles.stepLine, s < 1 && styles.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Sélection du prix du poisson</Text>
        <Text style={styles.subtitle}>Choisis le tarif du poisson commandé</Text>

        <View style={styles.priceList}>
          {activePrices.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.priceCard, selected === p.id && styles.priceCardSelected]}
              onPress={() => setSelected(p.id)}
              activeOpacity={0.8}
            >
              <View style={styles.priceLeft}>
                <View style={[styles.radio, selected === p.id && styles.radioSelected]}>
                  {selected === p.id && <View style={styles.radioDot} />}
                </View>
                <View>
                  <Text style={styles.priceAmount}>{p.amount.toLocaleString('fr-FR')} FCFA</Text>
                  <Text style={styles.priceSub}>Poisson braisé</Text>
                </View>
              </View>
              <Ionicons name="checkmark-circle" size={22} color={selected === p.id ? Colors.primary : Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Continuer"
          onPress={() => navigation.navigate('NewOrderStep2', { priceId: selected, prices: activePrices })}
          disabled={!selected}
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
    padding: 20, backgroundColor: Colors.bgCard, gap: 0,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  stepCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.bgInput, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  stepActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  stepNum: { fontSize: 13, fontWeight: '700', color: Colors.textMuted },
  stepNumActive: { color: Colors.textPrimary },
  stepLine: { width: 40, height: 2, backgroundColor: Colors.border },
  stepLineDone: { backgroundColor: Colors.primary },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  priceList: { gap: 12 },
  priceCard: {
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border,
  },
  priceCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  priceLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: Colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  priceAmount: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  priceSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  footer: { padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
});
