import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@navigation/AuthStack";
import { useAuth } from "@context/AuthContext";
import { useTheme } from "@theme/ThemeProvider";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Mail, Lock, LogIn, ChevronLeft } from "lucide-react-native";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export const LoginScreen = ({ navigation }: Props) => {
  const { colors, spacing, radius, typography } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Failed to login. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.container, { padding: spacing.lg }]}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Landing")}
            style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary + "15" }]}>
              <LogIn size={32} color={colors.primary} />
            </View>
            <Text style={[typography.h1, { color: colors.text, marginTop: spacing.lg }]}>
              Welcome back
            </Text>
            <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.xs }]}>
              Sign in to manage your tasks.
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              icon={Mail}
            />
            <Input
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              icon={Lock}
            />

            {error && (
              <View style={[styles.errorContainer, { backgroundColor: colors.danger + "10" }]}>
                <Text style={[typography.small, { color: colors.danger, textAlign: "center" }]}>
                  {error}
                </Text>
              </View>
            )}

            <Button
              label={isSubmitting ? "Signing in..." : "Sign in"}
              onPress={handleSubmit}
              loading={isSubmitting}
              style={{ marginTop: spacing.md }}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.footer}
          >
            <Text style={[typography.body, { color: colors.textMuted }]}>
              New here?{" "}
              <Text style={{ color: colors.primary, fontWeight: "700" }}>
                Create an account
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    zIndex: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
});

