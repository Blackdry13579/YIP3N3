import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { BrandLogo } from '../../components/BrandLogo';

type Props = NativeStackScreenProps<any, 'LoginError'>;

export function LoginErrorScreen({ navigation, route }: Props) {
  const email = route.params?.email ?? '';

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <BrandLogo size="medium" />
      </View>

      <View style={styles.errorCard}>
        <Ionicons name="alert-circle" size={40} color={Colors.error} />
        <Text style={styles.errorTitle}>Erreur de connexion</Text>
        <Text style={styles.errorMsg}>
          Impossible de te connecter avec l'adresse{'\n'}
          <Text style={styles.emailText}>{email}</Text>
        </Text>
        <Text style={styles.errorSub}>Vérifie ton mot de passe et réessaie.</Text>
      </View>

      <Button label="Réessayer" onPress={() => navigation.goBack()} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, padding: 24, justifyContent: 'center' },
  logoArea: { alignItems: 'center', marginBottom: 28 },
  errorCard: {
    backgroundColor: Colors.bgCard, borderRadius: 8, padding: 24,
    alignItems: 'center', gap: 12, borderWidth: 1, borderColor: Colors.error + '44',
    marginBottom: 28,
  },
  errorTitle: { fontSize: 18, fontWeight: '700', color: Colors.error },
  errorMsg: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  emailText: { color: Colors.textPrimary, fontWeight: '600' },
  errorSub: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
  btn: {},
});
