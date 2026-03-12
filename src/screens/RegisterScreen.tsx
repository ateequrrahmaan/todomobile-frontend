import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@navigation/AuthStack";
import { useAuth } from "@context/AuthContext";
import { useTheme } from "@theme/ThemeProvider";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Mail, Lock, UserPlus, ChevronLeft } from "lucide-react-native";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export const RegisterScreen = ({ navigation }: Props) => {
  const { colors, spacing, radius, typography } = useTheme();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email.trim(), password);
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;
      const fallbackMessage =
        typeof backendMessage === "string"
          ? backendMessage
          : err?.message || "Failed to register. Please try again.";
      setError(fallbackMessage);
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
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.container, { padding: spacing.lg }]}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
            >
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.header}>
              <View style={[styles.logoContainer, { backgroundColor: colors.accent + "15" }]}>
                <UserPlus size={32} color={colors.accent} />
              </View>
              <Text style={[typography.h1, { color: colors.text, marginTop: spacing.lg }]}>
                Create account
              </Text>
              <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.xs }]}>
                Sign up to start organizing your tasks.
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
              <Input
                label="Confirm password"
                placeholder="••••••••"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                label={isSubmitting ? "Creating account..." : "Create account"}
                onPress={handleSubmit}
                loading={isSubmitting}
                style={{ marginTop: spacing.md }}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.footer}
            >
              <Text style={[typography.body, { color: colors.textMuted }]}>
                Already have an account?{" "}
                <Text style={{ color: colors.primary, fontWeight: "700" }}>
                  Sign in
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginTop: 60,
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
    marginBottom: 20,
    alignItems: "center",
  },
});

