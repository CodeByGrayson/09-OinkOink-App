export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 12,
  md: 16,
  pill: 999,
};

export const lightColors = {
  background: '#F7F7F9',
  surface: '#FFFFFF',
  primary: '#2F6FED',
  text: '#1A1B25',
  textMuted: '#8A8D9F',
  border: '#ECEDF2',
  badgeNew: '#2F6FED',
  badgePopular: '#F5A524',
  badgeSale: '#E5484D',
  shadow: '#0F1222',
  // Fixed white, for text/icons on filled backgrounds (primary buttons, dark
  // badge pills) that stay saturated/dark in both themes — must not track
  // `surface`, which turns dark in dark mode and would kill contrast there.
  onColor: '#FFFFFF',
};

export const darkColors = {
  background: '#121218',
  surface: '#1C1D26',
  primary: '#5B8FF5',
  text: '#F2F2F5',
  textMuted: '#8E92A8',
  border: '#2E3040',
  badgeNew: '#5B8FF5',
  badgePopular: '#F5A524',
  badgeSale: '#F0655C',
  shadow: '#000000',
  onColor: '#FFFFFF',
};

function buildShadow(colors) {
  return {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  };
}

export const lightTheme = {
  mode: 'light',
  colors: lightColors,
  spacing,
  radius,
  shadow: buildShadow(lightColors),
};

export const darkTheme = {
  mode: 'dark',
  colors: darkColors,
  spacing,
  radius,
  shadow: buildShadow(darkColors),
};
