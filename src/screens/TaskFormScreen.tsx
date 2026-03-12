import React, { useEffect, useMemo, useState } from "react";
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
import dayjs from "dayjs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigation/AppStack";
import { useTheme } from "@theme/ThemeProvider";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useCreateTask, useTasks, useUpdateTask } from "@hooks/useTasks";
import { Priority, Status, TaskPayload } from "../types/task";
import { 
  Type, 
  AlignLeft, 
  Tag, 
  Calendar as CalendarIcon, 
  ChevronLeft,
  CheckCircle2,
  Clock
} from "lucide-react-native";

type Props = NativeStackScreenProps<AppStackParamList, "TaskForm">;

export const TaskFormScreen = ({ navigation, route }: Props) => {
  const { colors, spacing, typography, radius } = useTheme();
  const isEdit = !!route.params?.id;

  const { data: allTasks } = useTasks();
  const existingTask = useMemo(
    () => allTasks?.find((t) => t._id === route.params?.id),
    [allTasks, route.params?.id]
  );

  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );
  const [category, setCategory] = useState(existingTask?.category || "General");
  const [priority, setPriority] = useState<Priority>(
    existingTask?.priority || "medium"
  );
  const [status, setStatus] = useState<Status>(
    existingTask?.status || "pending"
  );
  const [dueDate, setDueDate] = useState(
    existingTask?.dueDate
      ? dayjs(existingTask.dueDate).format("YYYY-MM-DD")
      : dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description || "");
      setCategory(existingTask.category || "General");
      setPriority(existingTask.priority);
      setStatus(existingTask.status);
      setDueDate(dayjs(existingTask.dueDate).format("YYYY-MM-DD"));
    }
  }, [existingTask]);

  const handleSubmit = async () => {
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    const payload: TaskPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      category: category.trim() || "General",
      priority,
      status,
      dueDate: new Date(dueDate).toISOString()
    };

    try {
      if (isEdit && route.params?.id) {
        await updateMutation.mutateAsync({ id: route.params.id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      navigation.goBack();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Failed to save task. Please try again.";
      setError(message);
    }
  };

  const renderChoiceRow = <T extends string>(
    label: string,
    options: readonly T[],
    value: T,
    onChange: (v: T) => void,
    activeColor: string = colors.primary
  ) => (
    <View style={{ marginBottom: spacing.lg }}>
      <Text style={[styles.label, { color: colors.textMuted, fontSize: typography.tiny.fontSize }]}>
        {label}
      </Text>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        {options.map((opt) => {
          const active = opt === value;
          const isDanger = opt === "high";
          const isSuccess = opt === "low" || opt === "completed";
          const isWarning = opt === "medium";
          
          let chipColor = activeColor;
          if (active) {
            if (isDanger) chipColor = colors.danger;
            else if (isSuccess) chipColor = colors.success;
            else if (isWarning) chipColor = colors.warning;
          }

          return (
            <TouchableOpacity
              key={opt}
              onPress={() => onChange(opt)}
              style={[
                styles.choiceChip,
                {
                  backgroundColor: active ? chipColor : colors.surface,
                  borderColor: active ? chipColor : colors.border,
                  borderRadius: radius.md,
                }
              ]}
            >
              <Text
                style={[
                  typography.small,
                  {
                    color: active ? "#ffffff" : colors.textMuted,
                    fontWeight: active ? "700" : "500",
                    textTransform: "capitalize"
                  }
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[typography.h3, { color: colors.text }]}>
          {isEdit ? "Edit Task" : "New Task"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.xl
          }}
        >
          <View style={styles.formSection}>
            <Input
              label="Title"
              placeholder="What do you need to do?"
              value={title}
              onChangeText={setTitle}
              icon={Type}
            />
            <Input
              label="Description"
              placeholder="Add some details..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              icon={AlignLeft}
              style={{ minHeight: 100, textAlignVertical: "top" }}
            />
            <Input
              label="Category"
              placeholder="e.g. Work, Personal, Fitness"
              value={category}
              onChangeText={setCategory}
              icon={Tag}
            />
            <Input
              label="Due Date"
              placeholder="YYYY-MM-DD"
              value={dueDate}
              onChangeText={setDueDate}
              icon={CalendarIcon}
            />

            {renderChoiceRow<Priority>(
              "Priority Level",
              ["low", "medium", "high"] as const,
              priority,
              setPriority
            )}

            {isEdit &&
              renderChoiceRow<Status>(
                "Task Status",
                ["pending", "completed"] as const,
                status,
                setStatus,
                colors.success
              )}
          </View>

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: colors.danger + "10", borderRadius: radius.md }]}>
              <Text style={[typography.small, { color: colors.danger, textAlign: "center" }]}>
                {error}
              </Text>
            </View>
          )}

          <Button
            label={isEdit ? "Save Changes" : "Create Task"}
            onPress={handleSubmit}
            size="lg"
            icon={isEdit ? CheckCircle2 : Clock}
            loading={createMutation.isPending || updateMutation.isPending}
            style={{ marginTop: spacing.lg }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  formSection: {
    marginTop: 10,
  },
  label: {
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  choiceChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  errorContainer: {
    padding: 12,
    marginTop: 10,
  }
});

