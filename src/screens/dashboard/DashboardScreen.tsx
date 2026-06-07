import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { StatCard } from '../../components/StatCard';
import { OrderCard } from '../../components/OrderCard';
import { useAuth } from '../../context/AuthContext';
import { mockOrders } from '../../lib/mockData';

export function DashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const today = new Date().toDateString();
  const todayOrders = mockOrders.filter(o => new Date(o.created_at).toDateString() === today);
  const enCours = mockOrders.filter(o => o.status === 'en_cours');
  const terminees = mockOrders.filter(o => o.status === 'terminee');
  const totalJour = terminees.reduce((sum, o) => sum + o.total_amount, 0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour, {user?.full_name} 👋</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.avatarText}>{user?.full_name?.[0] ?? 'U'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.orange} />}
        contentContainerStyle={styles.scroll}
      >
        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard
            label="Total jour"
            value={`${totalJour.toLocaleString('fr-FR')}`}
            icon="cash-outline"
            color={Colors.green}
            sub="FCFA"
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard label="En cours" value={enCours.length} icon="time-outline" color={Colors.orange} />
          <View style={styles.statSep} />
          <StatCard label="Terminées" value={terminees.length} icon="checkmark-circle-outline" color={Colors.green} />
        </View>

        {/* Fish count breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Poissons vendus aujourd'hui</Text>
          {[2000, 3000, 5000].map(price => {
            const count = terminees.flatMap(o => o.items ?? []).filter(i => i.unit_price === price).reduce((s, i) => s + i.quantity, 0);
            return (
              <View key={price} style={styles.fishRow}>
                <Text style={styles.fishLabel}>Poisson {price.toLocaleString('fr-FR')} FCFA</Text>
                <Text style={styles.fishCount}>{count} vendu{count > 1 ? 's' : ''}</Text>
              </View>
            );
          })}
        </View>

        {/* En cours list */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>En cours ({enCours.length})</Text>
            {user?.role === 'serveur' && (
              <TouchableOpacity style={styles.newBtn} onPress={() => navigation.navigate('NewOrderStep1')}>
                <Ionicons name="add" size={16} color={Colors.textPrimary} />
                <Text style={styles.newBtnText}>Nouvelle</Text>
              </TouchableOpacity>
            )}
          </View>
          {enCours.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="fish-outline" size={36} color={Colors.textMuted} />
              <Text style={styles.emptyText}>Aucune commande en cours</Text>
            </View>
          ) : (
            enCours.map(o => (
              <OrderCard key={o.id} order={o} onPress={() => navigation.navigate('OrderDetail', { order: o })} />
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB pour serveur */}
      {user?.role === 'serveur' && (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewOrderStep1')}>
          <Ionicons name="add" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, paddingTop: 56, backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  greeting: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  date: { fontSize: 13, color: Colors.textSecondary, marginTop: 2, textTransform: 'capitalize' },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: Colors.greenDark, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.textPrimary, fontWeight: '700', fontSize: 16 },
  scroll: { padding: 16, paddingBottom: 100 },
  statsRow: { flexDirection: 'row', marginBottom: 10 },
  statSep: { width: 10 },
  section: { marginTop: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 12 },
  newBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.orange, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
  },
  newBtnText: { color: Colors.textPrimary, fontSize: 13, fontWeight: '600' },
  fishRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: Colors.bgCard, borderRadius: 10, padding: 12, marginBottom: 6,
    borderWidth: 1, borderColor: Colors.border,
  },
  fishLabel: { color: Colors.textSecondary, fontSize: 14 },
  fishCount: { color: Colors.green, fontWeight: '700', fontSize: 14 },
  empty: { alignItems: 'center', padding: 32, gap: 8 },
  emptyText: { color: Colors.textMuted, fontSize: 14 },
  fab: {
    position: 'absolute', bottom: 24, right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center',
    elevation: 6,
  },
});
