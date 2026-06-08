import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { mockOrders } from '../../lib/mockData';
import { Order } from '../../lib/supabase';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function NotificationsScreen({ navigation }: any) {
  const enCours: Order[] = mockOrders
    .filter(o => o.status === 'en_cours')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 30 }} />
      </View>

      {enCours.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={60} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>Aucune commande en cours</Text>
          <Text style={styles.emptySub}>Toutes les commandes ont été traitées.</Text>
        </View>
      ) : (
        <FlatList
          data={enCours}
          keyExtractor={o => o.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          ListHeaderComponent={() => (
            <View style={styles.countBanner}>
              <View style={styles.countDot} />
              <Text style={styles.countText}>
                {enCours.length} commande{enCours.length > 1 ? 's' : ''} en cours
              </Text>
            </View>
          )}
          renderItem={({ item: o }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('OrderDetail', { order: o })}
              activeOpacity={0.85}
            >
              <View style={styles.cardIconBox}>
                <Ionicons name="time" size={20} color={Colors.accent} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardRef}>{o.reference}</Text>
                <Text style={styles.cardSub}>
                  {o.mode === 'a_emporter' ? 'À emporter' : 'Sur place'} · {formatTime(o.created_at)}
                </Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardAmount}>{o.total_amount.toLocaleString('fr-FR')} FCFA</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>En cours</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={13} color={Colors.textMuted} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          )}
        />
      )}
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
  headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },

  emptyState: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 40,
  },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  emptySub: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },

  list: { padding: 16, paddingBottom: 40, gap: 0 },
  sep: { height: 1, backgroundColor: Colors.separator },

  countBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.orangeLight, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.accent + '30',
  },
  countDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent },
  countText: { fontSize: 13, fontWeight: '700', color: Colors.accentDark },

  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgCard, paddingVertical: 13, paddingHorizontal: 14,
    borderRadius: 0,
  },
  cardIconBox: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: Colors.orangeLight,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  cardBody: { flex: 1, gap: 2 },
  cardRef: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 0.4 },
  cardSub: { fontSize: 11, color: Colors.textSecondary },
  cardRight: { alignItems: 'flex-end', gap: 4, marginRight: 4 },
  cardAmount: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  badge: {
    backgroundColor: Colors.orangeLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20,
  },
  badgeText: { fontSize: 9, fontWeight: '700', color: Colors.accentDark },
});
