import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { LucideIcon } from "lucide-react-native";
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor 
} from "react-native-reanimated";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  icon?: LucideIcon;
};

export const Input = ({ label, error, icon: Icon, ...rest }: Props) => {
  const { colors, spacing, radius, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    marginBottom: spacing.md,
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          style={{
            color: isFocused ? colors.primary : colors.textMuted,
            fontSize: typography.tiny.fontSize,
            fontWeight: "600",
            marginBottom: spacing.xs,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: error 
              ? colors.danger 
              : isFocused 
                ? colors.primary 
                : colors.border,
            borderRadius: radius.md,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        {Icon && (
          <Icon 
            size={20} 
            color={isFocused ? colors.primary : colors.textMuted} 
            style={{ marginRight: spacing.sm }}
          />
        )}
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: typography.body.fontSize,
              paddingVertical: spacing.md,
            }
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>
      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: typography.tiny.fontSize,
            marginTop: spacing.xs,
            fontWeight: "500",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
  }
});

