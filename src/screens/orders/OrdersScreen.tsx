import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { OrderCard } from '../../components/OrderCard';
import { mockOrders } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';

type Tab = 'en_cours' | 'terminee';

export function OrdersScreen({ navigation }: any) {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('en_cours');

  const filtered = mockOrders.filter(o => {
    const statusMatch = o.status === tab;
    if (user?.role === 'patron') return statusMatch;
    return statusMatch && o.server_id === user?.id;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Commandes</Text>
        {user?.role === 'serveur' && (
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NewOrderStep1')}>
            <Ionicons name="add" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'en_cours' && styles.tabActive]}
          onPress={() => setTab('en_cours')}
        >
          <Text style={[styles.tabText, tab === 'en_cours' && styles.tabTextActive]}>En cours</Text>
          <View style={[styles.tabBadge, { backgroundColor: tab === 'en_cours' ? Colors.orange : Colors.bgInput }]}>
            <Text style={styles.tabBadgeText}>{mockOrders.filter(o => o.status === 'en_cours').length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'terminee' && styles.tabActive]}
          onPress={() => setTab('terminee')}
        >
          <Text style={[styles.tabText, tab === 'terminee' && styles.tabTextActive]}>Terminées</Text>
          <View style={[styles.tabBadge, { backgroundColor: tab === 'terminee' ? Colors.green : Colors.bgInput }]}>
            <Text style={styles.tabBadgeText}>{mockOrders.filter(o => o.status === 'terminee').length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>
              {tab === 'en_cours' ? 'Aucune commande en cours' : 'Aucune commande terminée'}
            </Text>
          </View>
        ) : (
          filtered.map(o => (
            <OrderCard
              key={o.id}
              order={o}
              onPress={() => navigation.navigate('OrderDetail', { order: o })}
            />
          ))
        )}
      </ScrollView>
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
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  addBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.orange },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  tabTextActive: { color: Colors.textPrimary },
  tabBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  tabBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  list: { padding: 16, paddingBottom: 80 },
  empty: { flex: 1, alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { color: Colors.textMuted, fontSize: 15 },
});
