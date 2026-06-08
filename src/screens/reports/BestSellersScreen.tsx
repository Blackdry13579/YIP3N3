import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { mockOrders } from '../../lib/mockData';

const MEDALS = ['🥇', '🥈', '🥉'];

export function BestSellersScreen({ navigation }: any) {
  const terminated = mockOrders.filter(o => o.status === 'terminee');

  const map = new Map<number, { qty: number; revenue: number }>();
  for (const order of terminated) {
    for (const item of order.items ?? []) {
      const existing = map.get(item.unit_price) ?? { qty: 0, revenue: 0 };
      map.set(item.unit_price, {
        qty: existing.qty + item.quantity,
        revenue: existing.revenue + item.line_total,
      });
    }
  }

  const ranked = Array.from(map.entries())
    .map(([price, { qty, revenue }]) => ({ price, qty, revenue }))
    .sort((a, b) => b.qty - a.qty);

  const maxQty = ranked[0]?.qty ?? 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meilleures ventes</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {ranked.map(({ price, qty, revenue }, i) => (
          <View key={price} style={styles.rankCard}>
            <Text style={styles.rankPos}>{i < 3 ? MEDALS[i] : `#${i + 1}`}</Text>
            <View style={styles.rankInfo}>
              <Text style={styles.priceLabel}>Poisson {price.toLocaleString('fr-FR')} FCFA</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${(qty / maxQty) * 100}%` as any }]} />
              </View>
            </View>
            <View style={styles.rankRight}>
              <Text style={styles.qtyText}>{qty} vendus</Text>
              <Text style={styles.revenueText}>{revenue.toLocaleString('fr-FR')} FCFA</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 56, paddingBottom: 14,
    backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },

  content: { padding: 16, gap: 12, paddingBottom: 40 },

  rankCard: {
    backgroundColor: Colors.bgCard, borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  rankPos: { fontSize: 22, width: 34, textAlign: 'center' },
  rankInfo: { flex: 1, gap: 8 },
  priceLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  barTrack: {
    height: 6, backgroundColor: Colors.separator, borderRadius: 3, overflow: 'hidden',
  },
  barFill: {
    height: '100%', backgroundColor: Colors.primary, borderRadius: 3,
  },
  rankRight: { alignItems: 'flex-end', gap: 2 },
  qtyText: { fontSize: 14, fontWeight: '800', color: Colors.accent },
  revenueText: { fontSize: 12, color: Colors.textSecondary },
});
