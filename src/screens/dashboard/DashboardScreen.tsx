import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, Modal, Image, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { mockOrders } from '../../lib/mockData';
import { ColorPalette } from '../../theme/colors';

const LOGO = require('../../../assets/logo_poisson.png');
const SPARK = [8, 14, 10, 20, 16, 28, 22, 36, 30, 48, 40, 60];
const SPARK_MAX = Math.max(...SPARK);
const PANEL_W = 260;

export function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { colors: c } = useTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [refreshing, setRefreshing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = useRef(new Animated.Value(-PANEL_W)).current;
  const isPatron = user?.role === 'patron';

  const enCours = mockOrders.filter(o => o.status === 'en_cours');
  const terminees = mockOrders.filter(o => o.status === 'terminee');
  const gainJour = terminees.reduce((s, o) => s + o.total_amount, 0);

  const recent = [...mockOrders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.primary} />}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.greeting}>Bienvenu 👋</Text>

        {/* Bannière */}
        <View style={styles.gainCard}>
          <View style={styles.gainLeft}>
            <Text style={styles.gainLabel}>Gain aujourd'hui</Text>
            <Text style={styles.gainValue}>{gainJour.toLocaleString('fr-FR')} FCFA</Text>
            <Text style={styles.gainSub}>Total des ventes aujourd'hui</Text>
          </View>
          <View style={styles.sparkWrapper}>
            {SPARK.map((h, i) => (
              <View key={i} style={[styles.sparkBar, { height: Math.max(3, (h / SPARK_MAX) * 52) }]} />
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { borderLeftColor: c.accent }]}>
            <Ionicons name="time-outline" size={18} color={c.accent} />
            <Text style={styles.statLabel}>Commandes{'\n'}en cours</Text>
            <Text style={[styles.statValue, { color: c.accent }]}>{enCours.length}</Text>
          </View>
          <View style={[styles.statBox, { borderLeftColor: c.primary }]}>
            <Ionicons name="checkmark-circle-outline" size={18} color={c.primary} />
            <Text style={styles.statLabel}>Commandes{'\n'}terminées</Text>
            <Text style={[styles.statValue, { color: c.primary }]}>{terminees.length}</Text>
          </View>
        </View>

        {/* Nouvelle commande */}
        <TouchableOpacity style={styles.newOrderBtn} onPress={() => navigation.navigate('NewOrder')} activeOpacity={0.85}>
          <Ionicons name="add" size={20} color={c.textOnDark} />
          <Text style={styles.newOrderBtnText}>Nouvelle commande</Text>
        </TouchableOpacity>

        {/* Dernières commandes */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Dernières commandes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {recent.length === 0 ? (
          <Text style={styles.emptyText}>Aucune commande</Text>
        ) : (
          recent.map(o => {
            const isEnCours = o.status === 'en_cours';
            const time = new Date(o.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            return (
              <TouchableOpacity
                key={o.id}
                style={styles.recentCard}
                onPress={() => navigation.navigate('OrderDetail', { order: o })}
                activeOpacity={0.85}
              >
                <View style={styles.recentLeft}>
                  <Text style={styles.recentRef}>{o.reference}</Text>
                  <Text style={styles.recentMode}>{o.mode === 'a_emporter' ? 'À emporter' : 'Sur place'}</Text>
                </View>
                <View style={styles.recentCenter}>
                  <Text style={styles.recentTime}>{time}</Text>
                </View>
                <View style={styles.recentRight}>
                  <Text style={styles.recentAmount}>{o.total_amount.toLocaleString('fr-FR')} FCFA</Text>
                  <View style={[styles.badge, { backgroundColor: isEnCours ? c.orangeLight : c.primaryLight }]}>
                    <Text style={[styles.badgeText, { color: isEnCours ? c.accentDark : c.primary }]}>
                      {isEnCours ? 'En cours' : 'Terminée'}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={13} color={c.textMuted} style={{ marginLeft: 2 }} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Sidebar */}
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

              {isPatron && (
                <TouchableOpacity style={styles.menuItem} onPress={() => closeMenu(() => navigation.navigate('PriceList'))}>
                  <Ionicons name="pricetag-outline" size={20} color={c.primary} />
                  <Text style={styles.menuItemText}>Gestion des prix</Text>
                  <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.menuItem} onPress={() => closeMenu(() => navigation.navigate('BestSellers'))}>
                <Ionicons name="trophy-outline" size={20} color={c.primary} />
                <Text style={styles.menuItemText}>Meilleures ventes</Text>
                <Ionicons name="chevron-forward" size={16} color={c.textMuted} />
              </TouchableOpacity>

              <View style={styles.menuSpacer} />

              <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => closeMenu(() => logout())}>
                <Ionicons name="log-out-outline" size={20} color={c.error} />
                <Text style={[styles.menuItemText, { color: c.error }]}>Se déconnecter</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function makeStyles(c: ColorPalette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
      backgroundColor: c.bgCard,
    },
    menuBtn: { padding: 4 },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    logoImg: { width: 30, height: 30 },
    logoText: { fontSize: 20, fontWeight: '900', color: c.textPrimary },
    bellBtn: { padding: 4 },

    scroll: { padding: 16, paddingBottom: 100, gap: 16 },
    greeting: { fontSize: 16, fontWeight: '700', color: c.textSecondary },

    gainCard: {
      backgroundColor: c.bgCard, borderRadius: 14,
      paddingHorizontal: 18, paddingVertical: 26,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      borderWidth: 1, borderColor: c.border,
      shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
    },
    gainLeft: { gap: 4, flex: 1 },
    gainLabel: { fontSize: 12, color: c.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
    gainValue: { fontSize: 30, fontWeight: '900', color: c.textPrimary },
    gainSub: { fontSize: 11, color: c.textMuted, fontStyle: 'italic' },
    sparkWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 52 },
    sparkBar: { width: 3, backgroundColor: c.primary, borderRadius: 2, opacity: 0.8 },

    statsRow: { flexDirection: 'row', gap: 12 },
    statBox: {
      flex: 1, backgroundColor: c.bgCard, borderRadius: 12,
      paddingVertical: 10, paddingHorizontal: 12,
      borderWidth: 1, borderColor: c.border, borderLeftWidth: 4, gap: 3,
    },
    statLabel: { fontSize: 11, color: c.textSecondary, lineHeight: 15 },
    statValue: { fontSize: 22, fontWeight: '900' },

    newOrderBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      backgroundColor: c.primary, borderRadius: 12, paddingVertical: 14, gap: 8,
    },
    newOrderBtnText: { fontSize: 15, fontWeight: '800', color: c.textOnDark },

    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 15, fontWeight: '700', color: c.textPrimary },
    seeAll: { fontSize: 13, color: c.primary, fontWeight: '600' },

    recentCard: {
      backgroundColor: c.bgCard, borderRadius: 10,
      paddingVertical: 9, paddingHorizontal: 12,
      flexDirection: 'row', alignItems: 'center',
      borderWidth: 1, borderColor: c.border,
    },
    recentLeft: { flex: 1, gap: 1 },
    recentRef: { fontSize: 13, fontWeight: '800', color: c.textPrimary, letterSpacing: 0.4 },
    recentMode: { fontSize: 11, color: c.textSecondary },
    recentCenter: { width: 46, alignItems: 'center', justifyContent: 'center' },
    recentTime: { fontSize: 11, fontWeight: '600', color: c.textSecondary, textAlign: 'center' },
    recentRight: { alignItems: 'flex-end', gap: 3, minWidth: 90 },
    recentAmount: { fontSize: 12, fontWeight: '700', color: c.textPrimary },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 20 },
    badgeText: { fontSize: 9, fontWeight: '700' },
    emptyText: { color: c.textMuted, fontSize: 14, textAlign: 'center', paddingVertical: 20 },

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
    menuSpacer: { flex: 1 },
  });
}
