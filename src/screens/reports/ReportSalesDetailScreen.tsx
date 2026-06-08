import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { mockOrders } from '../../lib/mockData';
import { Order } from '../../lib/supabase';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function ReportSalesDetailScreen({ navigation }: any) {
  const terminated = mockOrders.filter(o => o.status === 'terminee');
  const grandTotal = terminated.reduce((s, o) => s + o.total_amount, 0);

  const handleDownload = async () => {
    try {
      const header = ['Référence', 'Date', 'Qté', 'Total (FCFA)'].join(' | ');
      const separator = '─'.repeat(60);
      const rows = terminated.map(o => {
        const qty = (o.items ?? []).reduce((s, i) => s + i.quantity, 0);
        return [
          o.reference.padEnd(10),
          formatDate(o.created_at).padEnd(18),
          String(qty).padStart(3),
          o.total_amount.toLocaleString('fr-FR').padStart(10),
        ].join(' | ');
      });
      const content = [
        'DÉTAIL DES VENTES — YIPƐNƐ',
        separator,
        header,
        separator,
        ...rows,
        separator,
        `TOTAL : ${grandTotal.toLocaleString('fr-FR')} FCFA`,
      ].join('\n');

      await Share.share({ message: content, title: 'Détail des ventes YIPƐNƐ' });
    } catch {
      Alert.alert('Erreur', 'Impossible de partager le rapport.');
    }
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail des ventes</Text>
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload} activeOpacity={0.8}>
          <Ionicons name="share-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.col, { flex: 2 }]}>Date</Text>
        <Text style={styles.col}>Réf.</Text>
        <Text style={styles.col}>Qté</Text>
        <Text style={styles.col}>Prix</Text>
        <Text style={[styles.col, { color: Colors.primary }]}>Total</Text>
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

      {/* Bouton télécharger sticky en bas */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBtn} onPress={handleDownload} activeOpacity={0.85}>
          <Ionicons name="download-outline" size={18} color={Colors.textOnDark} />
          <Text style={styles.footerBtnText}>Télécharger / Partager</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginLeft: 8 },
  downloadBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.primary + '40',
  },

  tableHeader: {
    flexDirection: 'row', backgroundColor: Colors.bgCard,
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  col: { flex: 1, fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: '700' },
  list: { paddingBottom: 100 },
  row: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: Colors.bgCard,
  },
  rowDate: { flex: 2, fontSize: 11, color: Colors.textSecondary },
  rowRef: { flex: 1, fontSize: 12, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 1 },
  rowQty: { flex: 1, fontSize: 13, color: Colors.textPrimary, textAlign: 'center' },
  rowPrice: { flex: 1, fontSize: 11, color: Colors.textSecondary, textAlign: 'center' },
  rowTotal: { flex: 1, fontSize: 13, fontWeight: '700', color: Colors.primary, textAlign: 'right' },
  separator: { height: 1, backgroundColor: Colors.separator },

  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 16, borderTopWidth: 2, borderTopColor: Colors.border,
    backgroundColor: Colors.bgCard, marginTop: 8,
  },
  totalLabel: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  totalValue: { fontSize: 18, fontWeight: '900', color: Colors.primary },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 28,
    backgroundColor: Colors.bgCard,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  footerBtn: {
    backgroundColor: Colors.primary, borderRadius: 12,
    paddingVertical: 14, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  footerBtnText: { color: Colors.textOnDark, fontWeight: '800', fontSize: 15 },
});
