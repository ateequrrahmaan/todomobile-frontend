import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types/task";
import { useTheme } from "@theme/ThemeProvider";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  ChevronRight,
  AlertCircle
} from "lucide-react-native";
import dayjs from "dayjs";

type Props = {
  task: Task;
  onToggle: () => void;
  onPress: () => void;
  onDelete: () => void;
};

export const TaskItem = ({ task, onToggle, onPress, onDelete }: Props) => {
  const { colors, spacing, radius, typography } = useTheme();

  const isCompleted = task.status === "completed";
  const isOverdue = task.overdue && !isCompleted;

  const priorityConfig = {
    high: { color: colors.danger, label: "High" },
    medium: { color: colors.warning, label: "Medium" },
    low: { color: colors.success, label: "Low" },
  };

  const currentPriority = priorityConfig[task.priority as keyof typeof priorityConfig] || priorityConfig.low;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: spacing.md,
          borderRadius: radius.lg,
          marginBottom: spacing.sm,
        },
      ]}
    >
      <View style={styles.row}>
        <TouchableOpacity 
          onPress={onToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.checkbox}
        >
          {isCompleted ? (
            <CheckCircle2 size={24} color={colors.success} />
          ) : (
            <Circle size={24} color={colors.textMuted} />
          )}
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                typography.bodyBold,
                {
                  color: isCompleted ? colors.textMuted : colors.text,
                  textDecorationLine: isCompleted ? "line-through" : "none",
                },
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <View 
              style={[
                styles.priorityBadge, 
                { backgroundColor: currentPriority.color + "15" }
              ]}
            >
              <Text style={[typography.tiny, { color: currentPriority.color, fontWeight: "700" }]}>
                {currentPriority.label}
              </Text>
            </View>
          </View>

          {task.description ? (
            <Text
              style={[
                typography.small,
                {
                  color: colors.textMuted,
                  marginTop: 2,
                },
              ]}
              numberOfLines={1}
            >
              {task.description}
            </Text>
          ) : null}

          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Clock size={14} color={isOverdue ? colors.danger : colors.textMuted} />
              <Text 
                style={[
                  typography.tiny, 
                  { 
                    color: isOverdue ? colors.danger : colors.textMuted,
                    fontWeight: isOverdue ? "600" : "400"
                  }
                ]}
              >
                {dayjs(task.dueDate).format("MMM D")}
              </Text>
            </View>
            
            {task.category && (
              <View style={[styles.tag, { backgroundColor: colors.surfaceVariant }]}>
                <Text style={[typography.tiny, { color: colors.textMuted }]}>
                  {task.category}
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity 
          onPress={onDelete}
          style={styles.deleteButton}
        >
          <Trash2 size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 4,
  }
});

