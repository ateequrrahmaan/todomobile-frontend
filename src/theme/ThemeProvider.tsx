import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useColorScheme } from "react-native";
import { AppTheme, darkTheme, lightTheme } from "./theme";

export type ThemeMode = "dark" | "light" | "system";

type ThemeContextValue = AppTheme & {
  mode: ThemeMode;
  resolvedMode: Exclude<ThemeMode, "system">;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const stored = await AsyncStorage.getItem("theme_mode");
        if (stored === "light" || stored === "dark" || stored === "system") {
          setModeState(stored);
        }
      } catch {
        // ignore
      }
    };

    bootstrap();
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem("theme_mode", next).catch(() => undefined);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const resolvedMode: Exclude<ThemeMode, "system"> =
    mode === "system" ? (systemScheme === "light" ? "light" : "dark") : mode;

  const baseTheme = useMemo<AppTheme>(() => {
    return resolvedMode === "dark" ? darkTheme : lightTheme;
  }, [resolvedMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...baseTheme,
      mode,
      resolvedMode,
      setMode,
      toggleMode
    }),
    [baseTheme, mode, resolvedMode, setMode, toggleMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

