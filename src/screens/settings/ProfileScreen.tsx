import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Switch, Modal, TextInput, Image, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { ColorPalette } from '../../theme/colors';

const LOGO = require('../../../assets/logo_poisson.png');
const PANEL_W = 260;

function SettingRow({ label, iconName, onPress, right, c }: {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  right?: React.ReactNode;
  c: ColorPalette;
}) {
  const inner = (
    <>
      <Ionicons name={iconName} size={20} color={c.textPrimary} style={{ marginRight: 2 }} />
      <Text style={[rowStyles.label, { color: c.textPrimary }]}>{label}</Text>
      {right ?? <Ionicons name="chevron-forward" size={16} color={c.textMuted} />}
    </>
  );
  if (onPress) {
    return (
      <TouchableOpacity style={rowStyles.row} onPress={onPress} activeOpacity={0.8}>
        {inner}
      </TouchableOpacity>
    );
  }
  return <View style={rowStyles.row}>{inner}</View>;
}

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16 },
  label: { flex: 1, fontSize: 14, fontWeight: '500' },
});

export function ProfileScreen({ navigation }: any) {
  const { colors: c, isDark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [notifs, setNotifs] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [editEmail, setEditEmail] = useState(user?.email ?? '');
  const [editPhone, setEditPhone] = useState(user?.phone ?? '');
  const [editPassword, setEditPassword] = useState('');
  const [editPassword2, setEditPassword2] = useState('');
  const slideAnim = useRef(new Animated.Value(-PANEL_W)).current;
  const isPatron = user?.role === 'patron';

  const openMenu = () => {
    slideAnim.setValue(-PANEL_W);
    setShowMenu(true);
  };
  useEffect(() => {
    if (showMenu) {
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  }, [showMenu]);
  const closeMenu = (cb?: () => void) => {
    Animated.timing(slideAnim, { toValue: -PANEL_W, duration: 220, useNativeDriver: true })
      .start(() => { setShowMenu(false); cb?.(); });
  };

  const handleLogout = () => { setShowLogout(false); logout(); };
  const handleSaveInfo = () => { setShowEditInfo(false); };

  return (
    <View style={styles.container}>
      {/* Header — même style que Dashboard */}
      <View style={styles.header}>
        {isPatron ? (
          <TouchableOpacity style={styles.menuBtn} onPress={openMenu}>
            <Ionicons name="menu" size={24} color={c.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.menuBtn} />
        )}

        <View style={styles.logoRow}>
          <Image source={LOGO} style={styles.logoImg} resizeMode="contain" />
          <Text style={styles.logoText}>
            YIP<Text style={{ color: c.accent }}>Ɛ</Text>N<Text style={{ color: c.accent }}>Ɛ</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={22} color={c.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Bloc avatar centré */}
        <View style={styles.profileBlock}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={52} color={c.textMuted} />
          </View>
          <Text style={styles.profileName}>{user?.full_name}</Text>
          <View style={[styles.roleBadge, { backgroundColor: isPatron ? c.orangeLight : c.primaryLight }]}>
            <Text style={[styles.roleText, { color: isPatron ? c.accentDark : c.primary }]}>
              {isPatron ? 'Patron' : 'Serveur'}
            </Text>
          </View>
        </View>

        {/* Compte — édition réservée au patron */}
        {isPatron && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compte</Text>
            <View style={styles.sectionCard}>
              <SettingRow
                c={c}
                iconName="person-outline"
                label="Modifier mes informations personnelles"
                onPress={() => setShowEditInfo(true)}
              />
            </View>
          </View>
        )}

        {/* Préférences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.sectionCard}>
            <SettingRow
              c={c}
              iconName="notifications-outline"
              label="Notifications"
              right={
                <Switch value={notifs} onValueChange={setNotifs}
                  trackColor={{ false: c.border, true: c.primary }} thumbColor={c.textOnDark} />
              }
            />
            <View style={[styles.separator, { backgroundColor: c.separator, marginLeft: 50 }]} />
            <SettingRow
              c={c}
              iconName="moon-outline"
              label="Mode sombre"
              right={
                <Switch value={isDark} onValueChange={toggle}
                  trackColor={{ false: c.border, true: c.primary }} thumbColor={c.textOnDark} />
              }
            />
          </View>
        </View>

        {/* À propos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.sectionCard}>
            <SettingRow c={c} iconName="information-circle-outline" label="À propos de l'application" onPress={() => {}} />
            <View style={[styles.separator, { backgroundColor: c.separator, marginLeft: 50 }]} />
            <SettingRow c={c} iconName="code-slash-outline" label="Version" right={<Text style={styles.versionText}>2.0.0</Text>} />
          </View>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color={c.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sidebar burger */}
      <Modal visible={showMenu} transparent animationType="none">
        <TouchableOpacity style={styles.menuOverlay} onPress={() => closeMenu()} activeOpacity={1}>
          <Animated.View style={[styles.menuPanel, { transform: [{ translateX: slideAnim }] }]}>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
              <View style={styles.menuHeader}>
                <Image source={LOGO} style={{ width: 32, height: 32 }} resizeMode="contain" />
                <Text style={styles.menuTitle}>
                  YIP<Text style={{ color: c.accent }}>Ɛ</Text>N<Text style={{ color: c.accent }}>Ɛ</Text>
                </Text>
              </View>

              <TouchableOpacity style={styles.menuItem} onPress={() => closeMenu(() => navigation.navigate('PriceList'))}>
                <Ionicons name="pricetag-outline" size={20} color={c.primary} />
                <Text style={styles.menuItemText}>Gestion des prix</Text>
                <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => closeMenu(() => navigation.navigate('BestSellers'))}>
                <Ionicons name="trophy-outline" size={20} color={c.primary} />
                <Text style={styles.menuItemText}>Meilleures ventes</Text>
                <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
              </TouchableOpacity>

              <View style={{ flex: 1 }} />

              <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => closeMenu(() => logout())}>
                <Ionicons name="log-out-outline" size={20} color={c.error} />
                <Text style={[styles.menuItemText, { color: c.error }]}>Se déconnecter</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Logout modal */}
      <Modal visible={showLogout} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalIconBox}>
              <Ionicons name="log-out-outline" size={32} color={c.error} />
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

      {/* Edit info modal */}
      <Modal visible={showEditInfo} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.editModal}>
            <View style={styles.editModalHeader}>
              <Text style={styles.editModalTitle}>Modifier mes informations</Text>
              <TouchableOpacity onPress={() => setShowEditInfo(false)}>
                <Ionicons name="close" size={22} color={c.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {[
                { label: 'Adresse email', value: editEmail, set: setEditEmail, type: 'email-address' as const },
                { label: 'Téléphone', value: editPhone, set: setEditPhone, type: 'phone-pad' as const },
              ].map(f => (
                <View key={f.label} style={styles.editField}>
                  <Text style={styles.editLabel}>{f.label}</Text>
                  <TextInput style={styles.editInput} value={f.value} onChangeText={f.set}
                    keyboardType={f.type} autoCapitalize="none" placeholderTextColor={c.textMuted} />
                </View>
              ))}
              <View style={styles.editField}>
                <Text style={styles.editLabel}>Nouveau mot de passe</Text>
                <TextInput style={styles.editInput} value={editPassword} onChangeText={setEditPassword}
                  secureTextEntry placeholder="Laisser vide pour ne pas changer" placeholderTextColor={c.textMuted} />
              </View>
              <View style={styles.editField}>
                <Text style={styles.editLabel}>Confirmer le mot de passe</Text>
                <TextInput style={styles.editInput} value={editPassword2} onChangeText={setEditPassword2}
                  secureTextEntry placeholder="Répéter le nouveau mot de passe" placeholderTextColor={c.textMuted} />
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveInfo} activeOpacity={0.85}>
              <Text style={styles.saveBtnText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function makeStyles(c: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg },

    // ── Header identique au Dashboard ─────────────────────────────────────────
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
      backgroundColor: c.bgCard,
    },
    menuBtn: { padding: 4, width: 32 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    logoImg: { width: 30, height: 30 },
    logoText: { fontSize: 20, fontWeight: '900', color: c.textPrimary },
    bellBtn: { padding: 4 },

    content: { padding: 20, gap: 20, paddingBottom: 80 },

    // ── Bloc avatar centré ────────────────────────────────────────────────────
    profileBlock: {
      backgroundColor: c.bgCard, borderRadius: 20,
      paddingVertical: 28, paddingHorizontal: 20, alignItems: 'center', gap: 10,
      borderWidth: 1, borderColor: c.border,
      shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    avatarCircle: {
      width: 90, height: 90, borderRadius: 45,
      backgroundColor: c.separator, alignItems: 'center', justifyContent: 'center',
      borderWidth: 3, borderColor: c.border,
    },
    profileName: { fontSize: 22, fontWeight: '800', color: c.textPrimary },
    roleBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
    roleText: { fontSize: 13, fontWeight: '700' },

    // ── Sections ──────────────────────────────────────────────────────────────
    section: { gap: 6 },
    sectionTitle: {
      fontSize: 11, fontWeight: '700', color: c.textMuted,
      textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 4,
    },
    sectionCard: {
      backgroundColor: c.bgCard, borderRadius: 14,
      borderWidth: 1, borderColor: c.border, overflow: 'hidden',
    },
    separator: { height: 1 },
    versionText: { fontSize: 13, color: c.textSecondary },

    logoutBtn: {
      flexDirection: 'row', alignItems: 'center', gap: 14,
      backgroundColor: c.bgCard, borderRadius: 14, padding: 16,
      borderWidth: 1, borderColor: c.border,
    },
    logoutText: { fontSize: 15, fontWeight: '600', color: c.error },

    // ── Sidebar ───────────────────────────────────────────────────────────────
    menuOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start' },
    menuPanel: {
      backgroundColor: c.bgCard, width: PANEL_W,
      paddingTop: 56, paddingBottom: 24,
      borderTopRightRadius: 20, borderBottomRightRadius: 20,
      height: '100%', flexDirection: 'column',
      shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 16, elevation: 8,
    },
    menuHeader: {
      flexDirection: 'row', alignItems: 'center', gap: 10,
      paddingHorizontal: 20, paddingBottom: 20,
      borderBottomWidth: 1, borderBottomColor: c.border, marginBottom: 8,
    },
    menuTitle: { fontSize: 22, fontWeight: '900', color: c.textPrimary },
    menuItem: {
      flexDirection: 'row', alignItems: 'center', gap: 14,
      paddingHorizontal: 20, paddingVertical: 16,
      borderBottomWidth: 1, borderBottomColor: c.separator,
    },
    menuItemText: { flex: 1, fontSize: 15, fontWeight: '600', color: c.textPrimary },

    // ── Modals ────────────────────────────────────────────────────────────────
    overlay: {
      flex: 1, backgroundColor: c.overlay,
      justifyContent: 'center', alignItems: 'center', padding: 24,
    },
    modal: {
      backgroundColor: c.bgCard, borderRadius: 14, padding: 24,
      alignItems: 'center', gap: 12, width: '100%',
    },
    modalIconBox: {
      width: 72, height: 72, borderRadius: 36,
      backgroundColor: c.error + '22', alignItems: 'center', justifyContent: 'center',
    },
    modalTitle: { fontSize: 18, fontWeight: '800', color: c.textPrimary },
    modalSub: { fontSize: 14, color: c.textSecondary, textAlign: 'center' },
    modalConfirm: {
      width: '100%', backgroundColor: c.error, borderRadius: 10,
      paddingVertical: 14, alignItems: 'center',
    },
    modalConfirmText: { color: c.textOnDark, fontWeight: '700', fontSize: 15 },
    modalCancel: { paddingVertical: 8 },
    modalCancelText: { color: c.primary, fontSize: 14, fontWeight: '700' },

    editModal: {
      backgroundColor: c.bgCard, borderRadius: 20, padding: 20,
      width: '100%', maxHeight: '80%',
    },
    editModalHeader: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: 20,
    },
    editModalTitle: { fontSize: 17, fontWeight: '800', color: c.textPrimary },
    editField: { marginBottom: 16 },
    editLabel: { fontSize: 12, color: c.textMuted, fontWeight: '600', marginBottom: 6 },
    editInput: {
      backgroundColor: c.bgInput, borderRadius: 8, padding: 12,
      borderWidth: 1, borderColor: c.border, fontSize: 15, color: c.textPrimary,
    },
    saveBtn: {
      backgroundColor: c.primary, borderRadius: 10,
      paddingVertical: 15, alignItems: 'center', marginTop: 8,
    },
    saveBtnText: { fontSize: 15, fontWeight: '800', color: c.textOnDark },
  });
}
