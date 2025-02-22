export const colors = {
  primary: '#FFD21D',
  secondary: '#57A9FF',
  background: '#000000',
  text: '#FFFFFF',
  link: '#57A9FF',
  // Additional color schemes
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#FF5252',
  info: '#2196F3',
  // Dark mode colors
  darkBackground: '#121212',
  darkSurface: '#1E1E1E',
  darkText: '#FFFFFF',
  // Light mode colors
  lightBackground: '#FFFFFF',
  lightSurface: '#F5F5F5',
  lightText: '#000000',
  // Gradients
  gradientPrimary: ['#FFD21D', '#FFA000'],
  gradientSecondary: ['#57A9FF', '#2196F3']
};

export const typography = {
  fontFamily: {
    black: 'Montserrat-Black',
    bold: 'Montserrat-Bold',
    extrabold: 'Montserrat-ExtraBold',
    light: 'Montserrat-Light',
    medium: 'Montserrat-Medium',
    regular: 'Montserrat-Regular',
    semibold: 'Montserrat-SemiBold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
};

export const borderRadius = {
  sm: 4,
  base: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const elevation = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  animation,
  elevation,
};