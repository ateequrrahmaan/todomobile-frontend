import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@context/AuthContext";
import { AuthStack } from "./AuthStack";
import { AppTabs } from "./AppTabs";
import { useTheme } from "@theme/ThemeProvider";

export const RootNavigator = () => {
  const { isLoading, token } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return token ? <AppTabs /> : <AuthStack />;
};

