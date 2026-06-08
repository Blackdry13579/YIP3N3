export const lightColors = {
  primary: '#217119',
  primaryDark: '#1A5A14',
  primaryLight: '#E8F5E6',
  accent: '#F1920E',
  accentDark: '#D4780A',

  bg: '#FAFAFA',
  bgCard: '#FFFFFF',
  bgInput: '#FFFFFF',
  bgCardLight: '#F4FBF5',

  orange: '#F1920E',
  orangeLight: '#FEF3E2',
  green: '#217119',
  greenDark: '#1A5A14',

  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#8A948E',
  textOnDark: '#FFFFFF',

  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',

  border: '#E4E7EC',
  separator: '#EEF1F4',
  overlay: 'rgba(0,0,0,0.6)',
  shadow: 'rgba(15, 23, 42, 0.08)',

  tabActive: '#217119',
  tabInactive: '#7A847E',
};

export const darkColors: typeof lightColors = {
  ...lightColors,
  primary: '#174C10',
  primaryDark: '#0F3309',
  primaryLight: '#1E3A1A',
  green: '#174C10',
  greenDark: '#0F3309',
  tabActive: '#174C10',
  bg: '#0F1117',
  bgCard: '#1A1D27',
  bgInput: '#252836',
  bgCardLight: '#1E2133',
  textPrimary: '#F1F3F9',
  textSecondary: '#9BA5B7',
  textMuted: '#5E6A7A',
  textOnDark: '#FFFFFF',
  border: '#2A2F42',
  separator: '#252836',
  overlay: 'rgba(0,0,0,0.75)',
  shadow: 'rgba(0,0,0,0.4)',
  tabInactive: '#5E6A7A',
};

export type ColorPalette = typeof lightColors;

export const Colors = lightColors;
