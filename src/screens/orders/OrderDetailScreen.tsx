import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Order } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function OrderDetailScreen({ navigation, route }: any) {
  const { order } = route.params as { order: Order };
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEnCours = order.status === 'en_cours';
  const canMark = user?.role === 'serveur' && isEnCours;

  const handleMarkDone = async () => {
    setLoading(true);
    // TODO: update order status in supabase
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setShowConfirm(false);
    navigation.navigate('OrderSuccess', { order: { ...order, status: 'terminee' } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail commande</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Reference & Status */}
        <View style={styles.refCard}>
          <Text style={styles.refCode}>{order.reference}</Text>
          <View style={[styles.statusBadge, { backgroundColor: isEnCours ? Colors.orange + '22' : Colors.green + '22' }]}>
            <View style={[styles.statusDot, { backgroundColor: isEnCours ? Colors.orange : Colors.green }]} />
            <Text style={[styles.statusText, { color: isEnCours ? Colors.orange : Colors.green }]}>
              {isEnCours ? 'En cours' : 'Terminée'}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.card}>
          <Row label="Serveur" value={order.server_name ?? '—'} />
          <Row label="Créée le" value={formatDateTime(order.created_at)} />
          {order.completed_at && <Row label="Terminée le" value={formatDateTime(order.completed_at)} />}
          {order.client_phone && <Row label="Téléphone client" value={order.client_phone} />}
        </View>

        {/* Items */}
        <Text style={styles.sectionTitle}>Détail de la commande</Text>
        <View style={styles.card}>
          {(order.items ?? []).map((item, i) => (
            <View key={i} style={[styles.itemRow, i > 0 && styles.itemBorder]}>
              <View>
                <Text style={styles.itemLabel}>{item.unit_price.toLocaleString('fr-FR')} FCFA × {item.quantity}</Text>
                <Text style={styles.itemSub}>Poisson braisé</Text>
              </View>
              <Text style={styles.itemTotal}>{item.line_total.toLocaleString('fr-FR')} FCFA</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{order.total_amount.toLocaleString('fr-FR')} FCFA</Text>
          </View>
        </View>
      </ScrollView>

      {canMark && (
        <View style={styles.footer}>
          <Button label="Marquer comme terminée" onPress={() => setShowConfirm(true)} />
        </View>
      )}

      {/* Confirm Modal */}
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Ionicons name="checkmark-circle-outline" size={48} color={Colors.green} />
            <Text style={styles.modalTitle}>Marquer comme terminée ?</Text>
            <Text style={styles.modalSub}>
              La commande <Text style={styles.bold}>{order.reference}</Text> sera marquée comme terminée et le reçu sera généré.
            </Text>
            <Button label="Oui, terminer" onPress={handleMarkDone} loading={loading} style={styles.modalBtn} />
            <Button label="Annuler" variant="ghost" onPress={() => setShowConfirm(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
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
  content: { padding: 20, gap: 16, paddingBottom: 100 },
  refCard: {
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 20,
    alignItems: 'center', gap: 12, borderWidth: 1, borderColor: Colors.border,
  },
  refCode: { fontSize: 32, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 13, fontWeight: '600' },
  card: { backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: Colors.border, gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontSize: 14, color: Colors.textSecondary },
  rowValue: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  itemBorder: { borderTopWidth: 1, borderTopColor: Colors.separator },
  itemLabel: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },
  itemSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  itemTotal: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: Colors.border },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  totalValue: { fontSize: 20, fontWeight: '800', color: Colors.orange },
  footer: { padding: 20, paddingBottom: 36, borderTopWidth: 1, borderTopColor: Colors.border },
  overlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'center', alignItems: 'center', padding: 24 },
  modal: {
    backgroundColor: Colors.bgCard, borderRadius: 20, padding: 24,
    alignItems: 'center', gap: 12, width: '100%', borderWidth: 1, borderColor: Colors.border,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  modalSub: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  bold: { color: Colors.textPrimary, fontWeight: '700' },
  modalBtn: { width: '100%', marginTop: 4 },
});
