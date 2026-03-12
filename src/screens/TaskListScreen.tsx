import React, { useMemo, useState } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigation/AppStack";
import { useTheme } from "@theme/ThemeProvider";
import { useAuth } from "@context/AuthContext";
import { Button } from "@components/Button";
import { TaskItem } from "@components/TaskItem";
import { TaskFilterBar, StatusFilter, PriorityFilter } from "@components/TaskFilterBar";
import { useTasks, useDeleteTask, useToggleTask } from "@hooks/useTasks";
import { Settings, Plus, LayoutGrid, List as ListIcon } from "lucide-react-native";
import { FloatingActionButton } from "@components/FloatingActionButton";

type Props = NativeStackScreenProps<AppStackParamList, "TaskList">;

export const TaskListScreen = ({ navigation }: Props) => {
  const { colors, spacing, radius, typography } = useTheme();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<PriorityFilter>("all");

  const queryParams = useMemo(
    () => ({
      search: search || undefined,
      status: status === "all" ? undefined : status,
      priority: priority === "all" ? undefined : priority
    }),
    [search, status, priority]
  );

  const { data, isLoading, refetch, isRefetching } = useTasks(queryParams);
  const deleteMutation = useDeleteTask();
  const toggleMutation = useToggleTask();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleToggle = (id: string) => {
    toggleMutation.mutate(id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.md }]}>
        <View>
          <Text style={[typography.h2, { color: colors.text }]}>My Tasks</Text>
          <Text style={[typography.small, { color: colors.textMuted }]}>
            {isLoading ? "Updating..." : `${data?.length || 0} tasks found`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.getParent()?.navigate("Settings" as never)}
          style={[
            styles.iconButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.md,
            },
          ]}
        >
          <Settings size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.md }}>
        <TaskFilterBar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
        />
      </View>

      <FlatList
        data={data || []}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.md,
          paddingBottom: spacing.xxl,
        }}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => navigation.navigate("TaskForm", { id: item._id })}
            onToggle={() => handleToggle(item._id)}
            onDelete={() => handleDelete(item._id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyState}>
              <LayoutGrid size={48} color={colors.border} />
              <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.md }]}>
                No tasks found matching your filters
              </Text>
              <Button
                label="Clear Filters"
                variant="ghost"
                onPress={() => {
                  setSearch("");
                  setStatus("all");
                  setPriority("all");
                }}
                style={{ marginTop: spacing.sm }}
              />
            </View>
          ) : null
        }
      />

      <FloatingActionButton onPress={() => navigation.navigate("TaskForm")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});

