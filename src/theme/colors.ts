export const lightTheme = {
  primary: '#1E8449',
  primaryLight: '#E8F5E9',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#888888',
  border: '#F5F5F5',
  card: '#FFFFFF',
  error: '#C0392B',
  success: '#1E8449',
  warning: '#E67E22',
  secondary: '#F5A623',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#888888',
  lightGray: '#F5F5F5',
};

export const darkTheme = {
  primary: '#2ECC71',
  primaryLight: '#1B3F2A',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#2C2C2C',
  card: '#1E1E1E',
  error: '#E74C3C',
  success: '#2ECC71',
  warning: '#F39C12',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#AAAAAA',
  lightGray: '#2C2C2C',
};

export type ThemeColors = typeof lightTheme;

const colors = lightTheme; // Default export for backward compatibility if needed

export default colors;
