import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary },
  h2: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  h3: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  h4: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
  body: { fontSize: 14, fontWeight: '400', color: Colors.textPrimary },
  bodyMuted: { fontSize: 14, fontWeight: '400', color: Colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400', color: Colors.textMuted },
  label: { fontSize: 13, fontWeight: '500', color: Colors.textSecondary },
  mono: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 2 },
});
