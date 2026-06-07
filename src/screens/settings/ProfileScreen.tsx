import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

export function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [notifs, setNotifs] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const isPatron = user?.role === 'patron';

  const handleLogout = () => {
    setShowLogout(false);
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil / Paramètres</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar & name */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.full_name?.[0] ?? 'U'}</Text>
          </View>
          <Text style={styles.name}>{user?.full_name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={[styles.roleBadge, { backgroundColor: isPatron ? Colors.orange + '22' : Colors.green + '22' }]}>
            <Text style={[styles.roleText, { color: isPatron ? Colors.orange : Colors.green }]}>
              {isPatron ? 'Patron' : 'Serveur / Employé'}
            </Text>
          </View>
        </View>

        {/* Settings */}
        {isPatron && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={20} color={Colors.textSecondary} />
                <View>
                  <Text style={styles.settingLabel}>Commandes terminées</Text>
                  <Text style={styles.settingDesc}>Recevoir une notif à chaque finalisation</Text>
                </View>
              </View>
              <Switch
                value={notifs}
                onValueChange={setNotifs}
                trackColor={{ false: Colors.bgInput, true: Colors.orange }}
                thumbColor={Colors.textPrimary}
              />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>MVP 1.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Base de données</Text>
            <Text style={styles.infoValue}>Supabase local</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout confirm modal */}
      <Modal visible={showLogout} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalIcon}>
              <Ionicons name="log-out-outline" size={32} color={Colors.error} />
            </View>
            <Text style={styles.modalTitle}>Se déconnecter ?</Text>
            <Text style={styles.modalSub}>Tu seras redirigé vers l'écran de connexion.</Text>
            <TouchableOpacity style={styles.modalConfirm} onPress={handleLogout}>
              <Text style={styles.modalConfirmText}>Se déconnecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowLogout(false)}>
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    padding: 20, paddingTop: 56, backgroundColor: Colors.bgCard,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  content: { padding: 20, gap: 20, paddingBottom: 80 },
  profileCard: {
    backgroundColor: Colors.bgCard, borderRadius: 16, padding: 24,
    alignItems: 'center', gap: 8, borderWidth: 1, borderColor: Colors.border,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.greenDark, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 30, fontWeight: '800', color: Colors.textPrimary },
  name: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  email: { fontSize: 14, color: Colors.textSecondary },
  roleBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20, marginTop: 4 },
  roleText: { fontSize: 13, fontWeight: '700' },
  section: { gap: 12 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.bgCard, borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: Colors.border,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  settingLabel: { fontSize: 14, color: Colors.textPrimary, fontWeight: '500' },
  settingDesc: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: Colors.bgCard, borderRadius: 10, padding: 14,
    borderWidth: 1, borderColor: Colors.border,
  },
  infoLabel: { fontSize: 14, color: Colors.textSecondary },
  infoValue: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: Colors.error + '11', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: Colors.error + '33',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
  overlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'center', alignItems: 'center', padding: 24 },
  modal: {
    backgroundColor: Colors.bgCard, borderRadius: 20, padding: 24,
    alignItems: 'center', gap: 12, width: '100%', borderWidth: 1, borderColor: Colors.border,
  },
  modalIcon: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.error + '22', alignItems: 'center', justifyContent: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  modalSub: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  modalConfirm: {
    width: '100%', backgroundColor: Colors.error, borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 4,
  },
  modalConfirmText: { color: Colors.textPrimary, fontWeight: '700', fontSize: 15 },
  modalCancel: { paddingVertical: 8 },
  modalCancelText: { color: Colors.textMuted, fontSize: 14 },
});
