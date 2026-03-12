import React from "react";
import {
  GestureResponderEvent,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

import { LucideIcon } from "lucide-react-native";

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = ({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled,
  loading,
  style
}: Props) => {
  const { colors, spacing, radius, typography } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          bg: colors.primary,
          text: "#ffffff",
          border: "transparent"
        };
      case "secondary":
        return {
          bg: colors.surfaceVariant,
          text: colors.text,
          border: "transparent"
        };
      case "danger":
        return {
          bg: colors.danger,
          text: "#ffffff",
          border: "transparent"
        };
      case "ghost":
        return {
          bg: "transparent",
          text: colors.primary,
          border: "transparent"
        };
      default:
        return {
          bg: colors.primary,
          text: "#ffffff",
          border: "transparent"
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
          fontSize: typography.small.fontSize,
          iconSize: 16
        };
      case "lg":
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          fontSize: typography.h3.fontSize,
          iconSize: 24
        };
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          fontSize: typography.bodyBold.fontSize,
          iconSize: 20
        };
    }
  };

  const vStyles = getVariantStyles();
  const sStyles = getSizeStyles();
  const scale = useSharedValue(1);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: vStyles.bg,
          borderColor: vStyles.border,
          borderWidth: vStyles.border === "transparent" ? 0 : 1,
          paddingVertical: sStyles.paddingVertical,
          paddingHorizontal: sStyles.paddingHorizontal,
          borderRadius: radius.md,
          opacity: disabled || loading ? 0.6 : 1,
          flexDirection: "row",
          gap: spacing.xs
        },
        style,
        aStyle
      ]}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 18, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 18, stiffness: 300 });
      }}
    >
      {Icon && !loading && <Icon size={sStyles.iconSize} color={vStyles.text} />}
      <Text
        style={{
          color: vStyles.text,
          fontSize: sStyles.fontSize,
          fontWeight: "600"
        }}
      >
        {loading ? "Loading..." : label}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  }
});

