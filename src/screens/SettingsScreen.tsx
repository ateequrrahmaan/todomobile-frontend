import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, ThemeMode } from "@theme/ThemeProvider";
import { useAuth } from "@context/AuthContext";
import * as Haptics from "expo-haptics";
import { 
  User, 
  Moon, 
  Sun, 
  Monitor, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Palette
} from "lucide-react-native";

export const SettingsScreen = () => {
  const { colors, spacing, radius, typography, mode, setMode } = useTheme();
  const { user, logout } = useAuth();

  const handleModeChange = (newMode: ThemeMode) => {
    Haptics.selectionAsync().catch(() => undefined);
    setMode(newMode);
  };

  const SettingItem = ({ 
    icon: Icon, 
    label, 
    value, 
    onPress, 
    destructive 
  }: { 
    icon: any, 
    label: string, 
    value?: string, 
    onPress: () => void,
    destructive?: boolean 
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: destructive ? colors.danger + "15" : colors.surfaceVariant }]}>
          <Icon size={20} color={destructive ? colors.danger : colors.primary} />
        </View>
        <Text style={[typography.body, { color: destructive ? colors.danger : colors.text, fontWeight: "500" }]}>
          {label}
        </Text>
      </View>
      <View style={styles.settingRight}>
        {value && (
          <Text style={[typography.small, { color: colors.textMuted, marginRight: spacing.xs }]}>
            {value}
          </Text>
        )}
        <ChevronRight size={18} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={[styles.header, { padding: spacing.lg }]}>
          <Text style={[typography.h1, { color: colors.text }]}>Settings</Text>
        </View>

        <View style={[styles.section, { paddingHorizontal: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted, fontSize: typography.tiny.fontSize }]}>
            Account
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg }]}>
            <View style={[styles.profileRow, { padding: spacing.md }]}>
              <View style={[styles.avatar, { backgroundColor: colors.primary + "15" }]}>
                <User size={24} color={colors.primary} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={[typography.bodyBold, { color: colors.text }]}>
                  {user?.email?.split('@')[0] || 'User'}
                </Text>
                <Text style={[typography.small, { color: colors.textMuted }]}>
                  {user?.email}
                </Text>
              </View>
            </View>
            <SettingItem 
              icon={ShieldCheck} 
              label="Account Security" 
              onPress={() => {}} 
            />
          </View>
        </View>

        <View style={[styles.section, { paddingHorizontal: spacing.lg, marginTop: spacing.xl }]}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted, fontSize: typography.tiny.fontSize }]}>
            Appearance
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg }]}>
            <View style={[styles.themeRow, { padding: spacing.md }]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.surfaceVariant }]}>
                  <Palette size={20} color={colors.primary} />
                </View>
                <Text style={[typography.body, { color: colors.text, fontWeight: "500" }]}>
                  Theme Mode
                </Text>
              </View>
            </View>
            
            <View style={styles.themeSelector}>
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor },
              ].map((item) => {
                const active = mode === item.id;
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleModeChange(item.id as ThemeMode)}
                    style={[
                      styles.themeOption,
                      {
                        backgroundColor: active ? colors.primary : colors.surfaceVariant,
                        borderRadius: radius.md,
                      }
                    ]}
                  >
                    <Icon size={18} color={active ? "#ffffff" : colors.textMuted} />
                    <Text style={[typography.tiny, { color: active ? "#ffffff" : colors.textMuted, marginTop: 4, fontWeight: "600" }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View style={[styles.section, { paddingHorizontal: spacing.lg, marginTop: spacing.xl }]}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted, fontSize: typography.tiny.fontSize }]}>
            Danger Zone
          </Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg }]}>
            <SettingItem 
              icon={LogOut} 
              label="Log Out" 
              destructive 
              onPress={() => {
                Alert.alert("Log out", "Are you sure you want to log out?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Log out", style: "destructive", onPress: () => logout() }
                ]);
              }} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeSelector: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  themeOption: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

