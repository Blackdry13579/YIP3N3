import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<any, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Remplis tous les champs.'); return; }
    setLoading(true);
    setError('');
    const ok = await login(email.trim(), password);
    setLoading(false);
    if (!ok) {
      setError('Email ou mot de passe incorrect.');
      navigation.navigate('LoginError', { email });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoBox}>
            <View style={styles.fishSmall} />
          </View>
          <Text style={styles.logoText}>
            YIP<Text style={styles.orange}>3</Text>N<Text style={styles.orange}>3</Text>
          </Text>
          <Text style={styles.tagline}>LE GOÛT AUTHENTIQUE{'\n'}DU <Text style={styles.taglineGreen}>POISSON BRAISÉ</Text></Text>
        </View>

        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Connecte-toi à ton compte</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Adresse e-mail</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="patron@yip3n3.com"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
              <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button label="Se connecter" onPress={handleLogin} loading={loading} style={styles.btn} />

        <Text style={styles.hint}>Connexion réservée au personnel YIP3N3</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.bg },
  container: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  logoArea: { alignItems: 'center', marginBottom: 36, gap: 8 },
  logoBox: { width: 64, height: 64, backgroundColor: Colors.bgCard, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: 1, borderColor: Colors.border },
  fishSmall: { width: 36, height: 22, backgroundColor: Colors.greenDark, borderRadius: 18 },
  logoText: { fontSize: 32, fontWeight: '900', color: Colors.textPrimary },
  orange: { color: Colors.orange },
  tagline: { fontSize: 11, color: Colors.textSecondary, textAlign: 'center', lineHeight: 16, letterSpacing: 0.5 },
  taglineGreen: { color: Colors.green, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 28 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: Colors.textSecondary, marginBottom: 8, fontWeight: '500' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.bgInput, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: 12, height: 50,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
  eyeBtn: { padding: 4 },
  error: { color: Colors.error, fontSize: 13, marginBottom: 12 },
  btn: { marginTop: 8, marginBottom: 20 },
  hint: { textAlign: 'center', color: Colors.textMuted, fontSize: 12 },
});
