import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar
} from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { Button } from "@components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@navigation/AuthStack";
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react-native";
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from "react-native-reanimated";

type Props = NativeStackScreenProps<AuthStackParamList, "Landing">;

const { width } = Dimensions.get("window");

export const LandingScreen = ({ navigation }: Props) => {
  const { colors, spacing, typography, radius } = useTheme();

  const features = [
    {
      icon: CheckCircle2,
      title: "Stay Organized",
      description: "Manage your daily tasks with ease and never miss a deadline.",
      color: colors.primary
    },
    {
      icon: Zap,
      title: "Boost Productivity",
      description: "Focus on what matters most with our streamlined interface.",
      color: colors.accent
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description: "Your data is encrypted and synced safely across your devices.",
      color: colors.success
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.content, { paddingHorizontal: spacing.xl }]}>
        
        <Animated.View 
          entering={FadeInUp.delay(200).duration(1000)}
          style={styles.header}
        >
          <View style={[styles.logoContainer, { backgroundColor: colors.primary + "15" }]}>
            <CheckCircle2 size={40} color={colors.primary} />
          </View>
          <Text style={[typography.h1, { color: colors.text, marginTop: spacing.lg, textAlign: "center" }]}>
            TaskMaster
          </Text>
          <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.xs, textAlign: "center" }]}>
            Master your day, one task at a time.
          </Text>
        </Animated.View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.delay(400 + index * 200).duration(800)}
              style={[styles.featureRow, { marginBottom: spacing.lg }]}
            >
              <View style={[styles.featureIcon, { backgroundColor: feature.color + "15" }]}>
                <feature.icon size={24} color={feature.color} />
              </View>
              <View style={styles.featureText}>
                <Text style={[typography.bodyBold, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[typography.small, { color: colors.textMuted }]}>
                  {feature.description}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>

        <Animated.View 
          entering={FadeInDown.delay(1000).duration(800)}
          style={styles.footer}
        >
          <Button
            label="Get Started"
            onPress={() => navigation.navigate("Register")}
            size="lg"
            icon={ArrowRight}
            style={styles.button}
          />
          <View style={{ height: spacing.sm }} />
          <Button
            label="Sign In"
            onPress={() => navigation.navigate("Login")}
            variant="ghost"
            size="lg"
            style={styles.button}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  featuresContainer: {
    marginVertical: 40,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  footer: {
    width: "100%",
  },
  button: {
    width: "100%",
  }
});
