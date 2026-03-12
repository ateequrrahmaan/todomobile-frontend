import React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "@navigation/RootNavigator";
import { AuthProvider } from "@context/AuthContext";
import { ThemeProvider, useTheme } from "@theme/ThemeProvider";

const queryClient = new QueryClient();

const AppShell = () => {
  const { resolvedMode, colors } = useTheme();

  const navTheme =
    resolvedMode === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: colors.background,
            card: colors.surface,
            border: colors.border,
            primary: colors.primary,
            text: colors.text
          }
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
            card: colors.surface,
            border: colors.border,
            primary: colors.primary,
            text: colors.text
          }
        };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={resolvedMode === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

