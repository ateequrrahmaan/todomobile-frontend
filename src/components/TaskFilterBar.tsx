import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@theme/ThemeProvider";
import { Input } from "./Input";
import { Search, Filter } from "lucide-react-native";

export type StatusFilter = "all" | "pending" | "completed";
export type PriorityFilter = "all" | "high" | "medium" | "low";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  priority: PriorityFilter;
  onPriorityChange: (value: PriorityFilter) => void;
};

export const TaskFilterBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange
}: Props) => {
  const { colors, spacing, radius, typography } = useTheme();

  const renderChip = (
    label: string,
    active: boolean,
    onPress: () => void,
    activeColor: string = colors.primary
  ) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        {
          backgroundColor: active ? activeColor : colors.surface,
          borderColor: active ? activeColor : colors.border,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
        }
      ]}
    >
      <Text
        style={[
          typography.tiny,
          {
            color: active ? "#ffffff" : colors.textMuted,
            fontWeight: active ? "700" : "500",
            textTransform: "capitalize"
          }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Input
        placeholder="Search tasks..."
        value={search}
        onChangeText={onSearchChange}
        icon={Search}
      />

      <View style={styles.filterSection}>
        <View style={styles.sectionHeader}>
          <Filter size={14} color={colors.textMuted} />
          <Text style={[typography.tiny, { color: colors.textMuted, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 }]}>
            Filters
          </Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.chipGroup}>
            {renderChip("All Status", status === "all", () => onStatusChange("all"))}
            {renderChip("Pending", status === "pending", () => onStatusChange("pending"), colors.primary)}
            {renderChip("Completed", status === "completed", () => onStatusChange("completed"), colors.success)}
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.chipGroup}>
            {renderChip("All Priority", priority === "all", () => onPriorityChange("all"))}
            {renderChip("High", priority === "high", () => onPriorityChange("high"), colors.danger)}
            {renderChip("Medium", priority === "medium", () => onPriorityChange("medium"), colors.warning)}
            {renderChip("Low", priority === "low", () => onPriorityChange("low"), colors.success)}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginTop: -4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 4,
  },
  chipGroup: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
  },
  divider: {
    width: 1,
    height: "60%",
    alignSelf: "center",
    marginHorizontal: 12,
  }
});

