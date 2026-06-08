import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  sub?: string;
}

export function StatCard({ label, value, icon, color = Colors.primary, sub }: StatCardProps) {
  return (
    <View style={[styles.card, { borderColor: color === Colors.primary ? Colors.primary : Colors.border }]}>
      <Ionicons name={icon} size={20} color={color} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: 8,
    padding: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  icon: { marginBottom: 4 },
  label: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 22, fontWeight: '800' },
  sub: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
});
