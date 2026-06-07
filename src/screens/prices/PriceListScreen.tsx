import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { FishPrice } from '../../lib/supabase';
import { mockPrices } from '../../lib/mockData';

export function PriceListScreen({ navigation }: any) {
  const [prices, setPrices] = useState<FishPrice[]>(mockPrices);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestion des prix</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddPrice')}>
          <Ionicons name="add" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.hint}>Les prix actifs sont disponibles pour les nouvelles commandes.</Text>

        {prices.map(price => (
          <View key={price.id} style={[styles.priceCard, !price.active && styles.priceInactive]}>
            <View style={styles.priceLeft}>
              <Text style={[styles.priceAmount, !price.active && styles.textFaded]}>
                {price.amount.toLocaleString('fr-FR')} FCFA
              </Text>
              <View style={[styles.activeBadge, { backgroundColor: price.active ? Colors.green + '22' : Colors.error + '22' }]}>
                <Text style={[styles.activeBadgeText, { color: price.active ? Colors.green : Colors.error }]}>
                  {price.active ? 'Actif' : 'Désactivé'}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('EditPrice', { price })}
              >
                <Ionicons name="pencil-outline" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
              {price.active && (
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: Colors.error + '22' }]}
                  onPress={() => navigation.navigate('DeactivatePrice', { price })}
                >
                  <Ionicons name="ban-outline" size={18} color={Colors.error} />
                </TouchableOpacity>
              )}
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
    padding: 20, paddingTop: 56, backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  addBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center',
  },
  list: { padding: 16, gap: 10, paddingBottom: 80 },
  hint: { fontSize: 13, color: Colors.textMuted, marginBottom: 6 },
  priceCard: {
    backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  priceInactive: { opacity: 0.6 },
  priceLeft: { gap: 6 },
  priceAmount: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  textFaded: { color: Colors.textMuted },
  activeBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  activeBadgeText: { fontSize: 11, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.bgInput, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
});
