/**
 * CofficeSpot Color Palette
 * ------------------------
 * A comprehensive list of all colors used in the application
 */

// Brand Colors
export const brandColors = {
  // purple: '#4A2A85', // Primary brand color
  // purpleLight: '#F0F0FF', // Light purple background
  // purpleDark: '#6B46C1', // Secondary/gradient purple

  purple: '#FFC67D', // Primary brand color
  purpleLight: '#F5F5DC', // Light purple background
  purpleDark: '#FF9164', // Secondary/gradient purple
};

// Gray Scale
export const grayScale = {
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

// Status Colors
export const statusColors = {
  success: '#10B981', // Green
  error: '#EF4444', // Red
  warning: '#F59E0B', // Amber
  info: '#3B82F6', // Blue
};

// Gradient Colors
export const gradients = {
  brand: `linear-gradient(to right, ${brandColors.purple},${brandColors.purpleDark})`,
  overlay: 'rgba(74, 42, 133, 0.1)', // Used for overlays and blur effects
};

// Opacity Variations (used with colors)
export const opacityValues = {
  '5': '0.05',
  '10': '0.1',
  '20': '0.2',
  '30': '0.3',
  '40': '0.4',
  '50': '0.5',
  '60': '0.6',
  '70': '0.7',
  '80': '0.8',
  '90': '0.9',
};

// Common Color Applications
export const commonUsage = {
  // Text Colors
  textPrimary: '#1F2937', // Main text color
  textSecondary: '#6B7280', // Secondary text
  textMuted: '#9CA3AF', // Muted text

  // Background Colors
  bgPrimary: '#FFFFFF', // Main background
  bgSecondary: '#F9FAFB', // Secondary background
  bgMuted: '#F3F4F6', // Muted background

  // Border Colors
  borderLight: '#E5E7EB',
  borderDefault: '#D1D5DB',
  borderDark: '#9CA3AF',

  // Shadow Colors
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.2)',
};

/**
 * CSS Variables (as used in globals.css)
 * These are the HSL values used in the application
 */
export const cssVariables = {
  '--background': '0 0% 100%',
  '--foreground': '222.2 84% 4.9%',
  '--card': '0 0% 100%',
  '--card-foreground': '222.2 84% 4.9%',
  '--popover': '0 0% 100%',
  '--popover-foreground': '222.2 84% 4.9%',
  '--primary': '221.2 83.2% 53.3%',
  '--primary-foreground': '210 40% 98%',
  '--secondary': '210 40% 96.1%',
  '--secondary-foreground': '222.2 47.4% 11.2%',
  '--muted': '210 40% 96.1%',
  '--muted-foreground': '215.4 16.3% 46.9%',
  '--accent': '210 40% 96.1%',
  '--accent-foreground': '222.2 47.4% 11.2%',
  '--destructive': '0 84.2% 60.2%',
  '--destructive-foreground': '210 40% 98%',
  '--border': '214.3 31.8% 91.4%',
  '--input': '214.3 31.8% 91.4%',
  '--ring': '221.2 83.2% 53.3%',
};

// Quick Reference for Common Brand Colors
export const quickReference = {
  mainPurple: brandColors.purple, // Primary brand color
  secondaryPurple: brandColors.purpleDark, // Used in gradients
  lightPurple: brandColors.purpleLight, // Background accent
  mainText: '#1F2937', // Primary text
  mainBackground: '#FFFFFF', // Primary background
};
