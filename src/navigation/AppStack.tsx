import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskListScreen } from "@screens/TaskListScreen";
import { TaskFormScreen } from "@screens/TaskFormScreen";

export type AppStackParamList = {
  TaskList: undefined;
  TaskForm: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
    </Stack.Navigator>
  );
};

