import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { mockOrders } from '../../lib/mockData';
import { Order } from '../../lib/supabase';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function ReportSalesDetailScreen({ navigation }: any) {
  const terminated = mockOrders.filter(o => o.status === 'terminee');
  const grandTotal = terminated.reduce((s, o) => s + o.total_amount, 0);

  const renderItem = ({ item: order }: { item: Order }) => (
    <View style={styles.row}>
      <Text style={styles.rowDate}>{formatDate(order.created_at)}</Text>
      <Text style={styles.rowRef}>{order.reference}</Text>
      <Text style={styles.rowQty}>{(order.items ?? []).reduce((s, i) => s + i.quantity, 0)}</Text>
      <Text style={styles.rowPrice}>{order.items?.[0]?.unit_price.toLocaleString('fr-FR') ?? '—'}</Text>
      <Text style={styles.rowTotal}>{order.total_amount.toLocaleString('fr-FR')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail des ventes</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.col, { flex: 2 }]}>Date</Text>
        <Text style={styles.col}>Réf.</Text>
        <Text style={styles.col}>Qté</Text>
        <Text style={styles.col}>Prix</Text>
        <Text style={[styles.col, { color: Colors.orange }]}>Total</Text>
      </View>

      <FlatList
        data={terminated}
        keyExtractor={o => o.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>{grandTotal.toLocaleString('fr-FR')} FCFA</Text>
          </View>
        )}
      />
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
  tableHeader: {
    flexDirection: 'row', backgroundColor: Colors.bgCard,
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  col: { flex: 1, fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4 },
  list: { paddingBottom: 80 },
  row: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12,
  },
  rowDate: { flex: 2, fontSize: 11, color: Colors.textSecondary },
  rowRef: { flex: 1, fontSize: 12, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 1 },
  rowQty: { flex: 1, fontSize: 13, color: Colors.textPrimary, textAlign: 'center' },
  rowPrice: { flex: 1, fontSize: 11, color: Colors.textSecondary, textAlign: 'center' },
  rowTotal: { flex: 1, fontSize: 13, fontWeight: '700', color: Colors.orange, textAlign: 'right' },
  separator: { height: 1, backgroundColor: Colors.separator },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 16, borderTopWidth: 2, borderTopColor: Colors.border,
    backgroundColor: Colors.bgCard, marginTop: 8,
  },
  totalLabel: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  totalValue: { fontSize: 18, fontWeight: '900', color: Colors.orange },
});
