import React, { useMemo } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@theme/ThemeProvider";
import { useAuth } from "@context/AuthContext";
import { useTasks } from "@hooks/useTasks";
import dayjs from "dayjs";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  ArrowRight,
  Calendar
} from "lucide-react-native";

export const DashboardScreen = () => {
  const { colors, spacing, radius, typography } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  const { data, isLoading, refetch, isRefetching } = useTasks();

  const stats = useMemo(() => {
    const tasks = data ?? [];
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;
    const overdue = tasks.filter((t) => t.overdue && t.status === "pending").length;
    const completionPct = total === 0 ? 0 : Math.round((completed / total) * 100);

    const nextDue = tasks
      .filter((t) => t.status === "pending")
      .slice()
      .sort((a, b) => dayjs(a.dueDate).valueOf() - dayjs(b.dueDate).valueOf())[0];

    return { total, completed, pending, overdue, completionPct, nextDue };
  }, [data]);

  const StatCard = ({
    title,
    value,
    hint,
    icon: Icon,
    color,
  }: {
    title: string;
    value: string;
    hint?: string;
    icon: any;
    color: string;
  }) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            padding: spacing.md,
            flex: 1,
          },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View
            style={{
              backgroundColor: color + "15",
              padding: spacing.xs,
              borderRadius: radius.sm,
            }}
          >
            <Icon size={20} color={color} />
          </View>
        </View>
        <Text
          style={[
            typography.h2,
            {
              color: colors.text,
              marginTop: spacing.sm,
            },
          ]}
        >
          {value}
        </Text>
        <Text style={[typography.tiny, { color: colors.textMuted, marginTop: 2 }]}>
          {title}
        </Text>
        {hint ? (
          <Text style={[typography.tiny, { color: color, marginTop: spacing.xs, fontWeight: "600" }]}>
            {hint}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ 
          paddingTop: spacing.md, 
          paddingHorizontal: spacing.lg, 
          paddingBottom: spacing.xl 
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
      >
        <View style={{ marginBottom: spacing.xl }}>
          <Text style={[typography.h1, { color: colors.text }]}>
            Hello, {user?.email?.split('@')[0] || 'User'}
          </Text>
          <Text style={[typography.body, { color: colors.textMuted }]}>
            Here's your productivity overview
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.md }}>
          <StatCard 
            title="Completed" 
            value={`${stats.completed}`} 
            icon={CheckCircle2} 
            color={colors.success}
            hint={`${stats.completionPct}% done`}
          />
          <StatCard 
            title="Pending" 
            value={`${stats.pending}`} 
            icon={Clock} 
            color={colors.primary}
          />
        </View>

        <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg }}>
          <StatCard 
            title="Overdue" 
            value={`${stats.overdue}`} 
            icon={AlertCircle} 
            color={stats.overdue > 0 ? colors.danger : colors.textMuted}
          />
          <StatCard 
            title="Total Tasks" 
            value={`${stats.total}`} 
            icon={BarChart3} 
            color={colors.accent}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              padding: spacing.lg,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm }}>
            <Calendar size={20} color={colors.primary} />
            <Text style={[typography.h3, { color: colors.text }]}>
              Up next
            </Text>
          </View>
          
          <Text style={[typography.body, { color: colors.text, marginBottom: spacing.md }]}>
            {isLoading
              ? "Loading next task..."
              : stats.nextDue
              ? stats.nextDue.title
              : "No upcoming tasks"}
          </Text>

          {stats.nextDue && (
            <Text style={[typography.small, { color: colors.textMuted, marginBottom: spacing.lg }]}>
              Due {dayjs(stats.nextDue.dueDate).format("MMMM D, YYYY")}
            </Text>
          )}

          <Button
            label="View All Tasks"
            onPress={() => (navigation as any).navigate("Tasks", { screen: "TaskList" })}
            icon={ArrowRight}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  }
});

