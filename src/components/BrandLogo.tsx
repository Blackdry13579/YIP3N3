import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../theme/colors';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  light?: boolean;
  showTagline?: boolean;
}

const LOGO = require('../../logo_poisson.png');

export function BrandLogo({ size = 'medium', light = false, showTagline = true }: BrandLogoProps) {
  const imageSize = size === 'large' ? 132 : size === 'medium' ? 92 : 34;
  const nameSize = size === 'large' ? 48 : size === 'medium' ? 30 : 15;
  const textColor = light ? Colors.textOnDark : Colors.textPrimary;

  return (
    <View style={styles.wrap}>
      <Image
        source={LOGO}
        style={{ width: imageSize, height: imageSize }}
        resizeMode="contain"
      />
      {size !== 'small' && (
        <>
          <Text style={[styles.name, { color: textColor, fontSize: nameSize }]}>
            YIP<Text style={styles.accent}>Ɛ</Text>N<Text style={styles.accent}>Ɛ</Text>
          </Text>
          {showTagline && (
            <Text style={[styles.tagline, { color: light ? '#EAF6EF' : Colors.textSecondary }]}>
              LE GOUT AUTHENTIQUE{'\n'}DU <Text style={styles.greenWord}>POISSON BRAISE</Text>
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  name: { fontWeight: '900', letterSpacing: 0 },
  accent: { color: Colors.accent },
  tagline: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
  greenWord: { color: Colors.primary, fontWeight: '900' },
});
