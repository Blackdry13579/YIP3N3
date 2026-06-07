import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<any, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Login'), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Braise glow effect */}
      <View style={styles.glowOrange} />
      <View style={styles.glowGreen} />

      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Logo SVG simplifié en View */}
        <View style={styles.fishIcon}>
          <View style={styles.fishBody} />
          <View style={styles.flame} />
        </View>
        <Text style={styles.logoText}>
          YIP<Text style={styles.logoOrange}>3</Text>N<Text style={styles.logoOrange}>3</Text>
        </Text>
        <View style={styles.taglineContainer}>
          <View style={styles.taglineLine} />
          <Text style={styles.tagline}>
            LE GOÛT AUTHENTIQUE{'\n'}DU{' '}
            <Text style={styles.taglineGreen}>POISSON BRAISÉ</Text>
          </Text>
          <View style={styles.taglineLine} />
        </View>
      </Animated.View>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrange: {
    position: 'absolute',
    top: height * 0.35,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    opacity: 0.15,
  },
  glowGreen: {
    position: 'absolute',
    bottom: height * 0.2,
    left: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.greenDark,
    opacity: 0.3,
  },
  logoContainer: { alignItems: 'center', gap: 16 },
  fishIcon: { width: 120, height: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  fishBody: {
    width: 80,
    height: 50,
    backgroundColor: Colors.greenDark,
    borderRadius: 40,
    transform: [{ rotate: '-20deg' }],
  },
  flame: {
    position: 'absolute',
    top: 10,
    right: 15,
    width: 30,
    height: 45,
    backgroundColor: Colors.orange,
    borderRadius: 15,
    transform: [{ rotate: '15deg' }],
  },
  logoText: { fontSize: 52, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 2 },
  logoOrange: { color: Colors.orange },
  taglineContainer: { alignItems: 'center', gap: 8, marginTop: 4 },
  taglineLine: { width: 40, height: 1, backgroundColor: Colors.textSecondary },
  tagline: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center', letterSpacing: 1, lineHeight: 18 },
  taglineGreen: { color: Colors.green, fontWeight: '700' },
  dots: { position: 'absolute', bottom: 60, flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { backgroundColor: Colors.green },
});
