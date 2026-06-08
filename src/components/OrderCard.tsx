import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Order } from '../lib/supabase';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const isEnCours = order.status === 'en_cours';
  const modeLabel = order.mode === 'a_emporter' ? 'À emporter' : 'Sur place';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>

      {/* Colonne gauche : référence + lieu + client */}
      <View style={styles.left}>
        <Text style={styles.ref}>{order.reference}</Text>
        <Text style={styles.mode}>{modeLabel}</Text>
        {order.client_phone ? (
          <Text style={styles.phone}>Client : {order.client_phone}</Text>
        ) : null}
      </View>

      {/* Centre : heure (vraiment centré grâce à position absolute) */}
      <View style={styles.centerCol}>
        <Text style={styles.time}>{formatTime(order.created_at)}</Text>
      </View>

      {/* Colonne droite : montant + badge */}
      <View style={styles.right}>
        <Text style={styles.amount}>{order.total_amount.toLocaleString('fr-FR')} FCFA</Text>
        <View style={[styles.badge, { backgroundColor: isEnCours ? Colors.orangeLight : Colors.primaryLight }]}>
          <Text style={[styles.badgeText, { color: isEnCours ? Colors.accentDark : Colors.primary }]}>
            {isEnCours ? 'En cours' : 'Terminée'}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={15} color={Colors.textMuted} style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Gauche — flex pour prendre l'espace disponible
  left: { flex: 1, gap: 2 },
  ref: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 0.5 },
  mode: { fontSize: 12, color: Colors.textSecondary },
  phone: { fontSize: 12, color: Colors.textSecondary },

  // Centre — largeur fixe pour que l'heure soit visuellement au milieu
  centerCol: {
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },

  // Droite
  right: { alignItems: 'flex-end', gap: 4, minWidth: 90 },
  amount: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '700' },

  chevron: { marginLeft: 4 },
});
