import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@theme/ThemeProvider";
import * as Haptics from "expo-haptics";

type Props = {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FloatingActionButton = ({
  onPress,
  iconName = "add",
  style
}: Props) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
        onPress();
      }}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 18, stiffness: 220 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 18, stiffness: 220 });
      }}
      style={[
        {
          position: "absolute",
          right: 18,
          bottom: 18,
          height: 56,
          width: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6
        },
        style,
        aStyle
      ]}
    >
      <Ionicons name={iconName} size={26} color="#ffffff" />
    </AnimatedPressable>
  );
};

