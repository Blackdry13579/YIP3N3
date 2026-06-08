import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { mockOrders } from '../../lib/mockData';

const PERIOD_LABELS: Record<string, string> = {
  aujourd_hui: "Aujourd'hui",
  semaine: 'Cette semaine',
  mois: 'Ce mois',
  date_specifique: 'Période sélectionnée',
};

export function ReportSummaryScreen({ navigation, route }: any) {
  const { period } = route.params as { period: string };
  const terminated = mockOrders.filter(o => o.status === 'terminee');
  const total = terminated.reduce((s, o) => s + o.total_amount, 0);
  const totalPoissons = terminated.flatMap(o => o.items ?? []).reduce((s, i) => s + i.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rapport — {PERIOD_LABELS[period]}</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Date line */}
        <Text style={styles.dateLabel}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</Text>

        {/* Summary cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Ionicons name="cash-outline" size={20} color={Colors.textOnDark} />
            <Text style={[styles.statLabel, styles.statLabelOnDark]}>Total ventes</Text>
            <Text style={[styles.statValue, styles.statValueOnDark]}>{total.toLocaleString('fr-FR')} FCFA</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="fish-outline" size={20} color={Colors.green} />
            <Text style={styles.statLabel}>Poissons vendus</Text>
            <Text style={[styles.statValue, { color: Colors.green }]}>{totalPoissons}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="receipt-outline" size={20} color={Colors.textSecondary} />
            <Text style={styles.statLabel}>Commandes</Text>
            <Text style={[styles.statValue, { color: Colors.textSecondary }]}>{terminated.length}</Text>
          </View>
        </View>

        {/* Navigation to sub-reports */}
        <Text style={styles.sectionTitle}>Détails</Text>
        <View style={styles.links}>
          <TouchableOpacity style={styles.linkCard} onPress={() => navigation.navigate('ReportSalesDetail', { period })}>
            <View>
              <Text style={styles.linkTitle}>Détail des ventes</Text>
              <Text style={styles.linkSub}>Liste complète des commandes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkCard} onPress={() => navigation.navigate('ReportPriceRanking', { period })}>
            <View>
              <Text style={styles.linkTitle}>Classement des prix</Text>
              <Text style={styles.linkSub}>Poissons les plus vendus</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Exporter PDF" onPress={() => {}} variant="secondary" style={{ flex: 1 }} />
        <View style={{ width: 10 }} />
        <Button label="Exporter CSV" onPress={() => {}} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, paddingTop: 56, backgroundColor: Colors.bg,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, flex: 1, textAlign: 'center', marginHorizontal: 8 },
  content: { padding: 20, gap: 20, paddingBottom: 100 },
  dateLabel: { fontSize: 14, color: Colors.textSecondary, textTransform: 'capitalize' },
  statsGrid: { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1, backgroundColor: Colors.bgCard, borderRadius: 8, padding: 14,
    borderWidth: 1, borderColor: Colors.border, gap: 6,
  },
  statCardPrimary: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  statLabelOnDark: { color: '#D7F4E4' },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  statValueOnDark: { color: Colors.textOnDark },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  links: { gap: 10 },
  linkCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.bgCard, borderRadius: 8, padding: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  linkTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 2 },
  linkSub: { fontSize: 12, color: Colors.textMuted },
  footer: { flexDirection: 'row', padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
});
