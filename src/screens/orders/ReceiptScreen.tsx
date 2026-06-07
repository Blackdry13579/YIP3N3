import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Order } from '../../lib/supabase';

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function ReceiptScreen({ navigation, route }: any) {
  const { order } = route.params as { order: Order };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reçu client</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ShareReceipt', { order })}>
          <Ionicons name="share-outline" size={22} color={Colors.orange} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Receipt card */}
        <View style={styles.receipt}>
          {/* Logo area */}
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptLogo}>YIP<Text style={styles.logoOrange}>3</Text>N<Text style={styles.logoOrange}>3</Text></Text>
            <Text style={styles.receiptTagline}>LE GOÛT AUTHENTIQUE DU POISSON BRAISÉ</Text>
            <View style={styles.receiptDivider} />
          </View>

          {/* Reference */}
          <View style={styles.refRow}>
            <Text style={styles.receiptLabel}>Référence</Text>
            <Text style={styles.receiptRef}>{order.reference}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.receiptLabel}>Date</Text>
            <Text style={styles.receiptValue}>{formatDateTime(order.created_at)}</Text>
          </View>
          {order.client_phone && (
            <View style={styles.refRow}>
              <Text style={styles.receiptLabel}>Téléphone</Text>
              <Text style={styles.receiptValue}>{order.client_phone}</Text>
            </View>
          )}

          <View style={styles.receiptDivider} />

          {/* Items */}
          <View style={styles.itemsHeader}>
            <Text style={styles.colLabel}>Article</Text>
            <Text style={styles.colLabel}>Qté</Text>
            <Text style={styles.colLabel}>Prix</Text>
            <Text style={styles.colLabel}>Total</Text>
          </View>
          {(order.items ?? []).map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text style={styles.itemName}>Poisson braisé</Text>
              <Text style={styles.itemVal}>{item.quantity}</Text>
              <Text style={styles.itemVal}>{item.unit_price.toLocaleString('fr-FR')}</Text>
              <Text style={styles.itemVal}>{item.line_total.toLocaleString('fr-FR')}</Text>
            </View>
          ))}

          <View style={styles.receiptDivider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>{order.total_amount.toLocaleString('fr-FR')} FCFA</Text>
          </View>

          {/* Footer */}
          <View style={styles.receiptDivider} />
          <Text style={styles.receiptFooter}>Merci pour votre commande !{'\n'}YIP3N3 — MVP Version 1.0</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Partager le reçu"
          onPress={() => navigation.navigate('ShareReceipt', { order })}
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
  scroll: { padding: 20, paddingBottom: 100 },
  receipt: {
    backgroundColor: Colors.bgCard, borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: Colors.border, gap: 12,
  },
  receiptHeader: { alignItems: 'center', gap: 6, paddingBottom: 4 },
  receiptLogo: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary },
  logoOrange: { color: Colors.orange },
  receiptTagline: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', letterSpacing: 0.5 },
  receiptDivider: { height: 1, backgroundColor: Colors.border, width: '100%' },
  refRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  receiptLabel: { fontSize: 13, color: Colors.textSecondary },
  receiptRef: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 2 },
  receiptValue: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  itemsHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  colLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, flex: 1, textAlign: 'center' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between' },
  itemName: { fontSize: 13, color: Colors.textPrimary, flex: 1 },
  itemVal: { fontSize: 13, color: Colors.textPrimary, flex: 1, textAlign: 'center' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  totalValue: { fontSize: 22, fontWeight: '900', color: Colors.orange },
  receiptFooter: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', lineHeight: 18 },
  footer: { padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
});
