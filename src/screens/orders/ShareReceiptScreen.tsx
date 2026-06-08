import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Order } from '../../lib/supabase';

const shareOptions = [
  { icon: 'logo-whatsapp' as const, label: 'WhatsApp', color: '#25D366' },
  { icon: 'document-text-outline' as const, label: 'PDF', color: Colors.error },
  { icon: 'print-outline' as const, label: 'Imprimer', color: Colors.textSecondary },
  { icon: 'ellipsis-horizontal' as const, label: 'Autres', color: Colors.textSecondary },
];

export function ShareReceiptScreen({ navigation, route }: any) {
  const { order } = route.params as { order: Order };

  const handleShare = (option: string) => {
    Alert.alert(`Partager via ${option}`, 'Fonctionnalité disponible en production.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partager le reçu</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.previewCard}>
          <Text style={styles.previewRef}>{order.reference}</Text>
          <Text style={styles.previewTotal}>{order.total_amount.toLocaleString('fr-FR')} FCFA</Text>
          <Text style={styles.previewLabel}>Reçu YIPƐNƐ</Text>
        </View>

        <Text style={styles.sectionTitle}>Choisir comment partager</Text>

        <View style={styles.optionsGrid}>
          {shareOptions.map(opt => (
            <TouchableOpacity key={opt.label} style={styles.option} onPress={() => handleShare(opt.label)}>
              <View style={[styles.optionIcon, { backgroundColor: opt.color + '22', borderColor: opt.color + '44' }]}>
                <Ionicons name={opt.icon} size={28} color={opt.color} />
              </View>
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  content: { padding: 24, gap: 24 },
  previewCard: {
    backgroundColor: Colors.bgCard, borderRadius: 16, padding: 24,
    alignItems: 'center', gap: 6, borderWidth: 1, borderColor: Colors.border,
  },
  previewRef: { fontSize: 22, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 3 },
  previewTotal: { fontSize: 26, fontWeight: '800', color: Colors.accentDark },
  previewLabel: { fontSize: 12, color: Colors.textMuted, letterSpacing: 1 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center' },
  option: { alignItems: 'center', gap: 8, width: '40%' },
  optionIcon: {
    width: 70, height: 70, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1,
  },
  optionLabel: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
});
