import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Order } from '../lib/supabase';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const isEnCours = order.status === 'en_cours';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <View style={[styles.badge, { backgroundColor: isEnCours ? Colors.orange + '22' : Colors.green + '22' }]}>
          <Text style={[styles.badgeText, { color: isEnCours ? Colors.orange : Colors.green }]}>
            {isEnCours ? 'En cours' : 'Terminée'}
          </Text>
        </View>
        <Text style={styles.ref}>{order.reference}</Text>
        <Text style={styles.meta}>{order.server_name} · {formatTime(order.created_at)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{order.total_amount.toLocaleString('fr-FR')} FCFA</Text>
        {order.client_phone && (
          <Text style={styles.phone}>{order.client_phone}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  left: { flex: 1, gap: 4 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 2 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  ref: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 1 },
  meta: { fontSize: 12, color: Colors.textSecondary },
  right: { alignItems: 'flex-end', gap: 4 },
  amount: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  phone: { fontSize: 12, color: Colors.textMuted },
});
