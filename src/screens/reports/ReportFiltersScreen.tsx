import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';

type Period = 'aujourd_hui' | 'semaine' | 'mois' | 'date_specifique';

const periods: { key: Period; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'aujourd_hui', label: "Aujourd'hui", icon: 'today-outline' },
  { key: 'semaine', label: 'Cette semaine', icon: 'calendar-outline' },
  { key: 'mois', label: 'Ce mois', icon: 'calendar-clear-outline' },
  { key: 'date_specifique', label: 'Date spécifique', icon: 'search-outline' },
];

export function ReportFiltersScreen({ navigation }: any) {
  const [selected, setSelected] = useState<Period>('aujourd_hui');

  const handleApply = () => {
    navigation.navigate('ReportSummary', { period: selected });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rapports</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Sélectionner la période</Text>

        <View style={styles.periodList}>
          {periods.map(p => (
            <TouchableOpacity
              key={p.key}
              style={[styles.periodCard, selected === p.key && styles.periodCardActive]}
              onPress={() => setSelected(p.key)}
              activeOpacity={0.8}
            >
              <View style={[styles.periodIcon, selected === p.key && styles.periodIconActive]}>
                <Ionicons name={p.icon} size={22} color={selected === p.key ? Colors.textPrimary : Colors.textMuted} />
              </View>
              <Text style={[styles.periodLabel, selected === p.key && styles.periodLabelActive]}>{p.label}</Text>
              {selected === p.key && <Ionicons name="checkmark-circle" size={20} color={Colors.orange} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.reportTypes}>
          <Text style={styles.sectionTitle}>Types de rapports disponibles</Text>
          {['Résumé des ventes', 'Détail des commandes', 'Classement par prix'].map(t => (
            <View key={t} style={styles.typeRow}>
              <Ionicons name="checkmark-circle-outline" size={16} color={Colors.green} />
              <Text style={styles.typeText}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Voir les rapports" onPress={handleApply} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    padding: 20, paddingTop: 56, backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  content: { padding: 20, gap: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  periodList: { gap: 10 },
  periodCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  periodCardActive: { borderColor: Colors.orange, backgroundColor: Colors.orange + '11' },
  periodIcon: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: Colors.bgInput, alignItems: 'center', justifyContent: 'center',
  },
  periodIconActive: { backgroundColor: Colors.orange },
  periodLabel: { flex: 1, fontSize: 15, color: Colors.textSecondary, fontWeight: '500' },
  periodLabelActive: { color: Colors.textPrimary, fontWeight: '700' },
  reportTypes: { gap: 10 },
  typeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  typeText: { fontSize: 14, color: Colors.textSecondary },
  footer: { padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
});
