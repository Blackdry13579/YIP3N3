import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function Header({ title, onBack, rightElement }: HeaderProps) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>YIP<Text style={styles.logoOrange}>3</Text>N<Text style={styles.logoOrange}>3</Text></Text>
        </View>
      )}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.right}>{rightElement ?? null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 36, alignItems: 'flex-start' },
  logoContainer: { width: 36 },
  logoText: { fontSize: 13, fontWeight: '800', color: Colors.textPrimary },
  logoOrange: { color: Colors.orange },
  title: { flex: 1, fontSize: 16, fontWeight: '600', color: Colors.textPrimary, textAlign: 'center' },
  right: { width: 36, alignItems: 'flex-end' },
});
