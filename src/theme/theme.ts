export const darkColors = {
  background: "#0a0a0a",
  surface: "#171717",
  surfaceVariant: "#262626",
  primary: "#3b82f6",
  primaryMuted: "#1d4ed8",
  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  text: "#fafafa",
  textMuted: "#a3a3a3",
  border: "#262626",
  accent: "#6366f1"
} as const;

export const lightColors = {
  background: "#ffffff",
  surface: "#f8fafc",
  surfaceVariant: "#f1f5f9",
  primary: "#2563eb",
  primaryMuted: "#dbeafe",
  danger: "#dc2626",
  success: "#16a34a",
  warning: "#d97706",
  text: "#0f172a",
  textMuted: "#64748b",
  border: "#e2e8f0",
  accent: "#4f46e5"
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999
} as const;

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "800" as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  tiny: {
    fontSize: 12,
    fontWeight: "500" as const,
    lineHeight: 16,
  }
} as const;

export type AppTheme = {
  colors: Record<keyof typeof darkColors, string>;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
};

export const darkTheme: AppTheme = {
  colors: darkColors,
  spacing,
  radius,
  typography
};

export const lightTheme: AppTheme = {
  colors: lightColors,
  spacing,
  radius,
  typography
};

