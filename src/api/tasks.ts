import { api } from "./client";
import { Task, TaskPayload } from "@types/task";

export interface TaskQueryParams {
  status?: string;
  priority?: string;
  category?: string;
  search?: string;
}

type ApiListResponse<T> = {
  success: boolean;
  data: T;
};

export const fetchTasks = async (
  params?: TaskQueryParams
): Promise<Task[]> => {
  const response = await api.get<ApiListResponse<Task[]>>("/tasks", {
    params
  });
  return response.data.data;
};

export const createTask = async (payload: TaskPayload): Promise<Task> => {
  const response = await api.post<ApiListResponse<Task>>("/tasks", payload);
  return response.data.data;
};

export const updateTask = async (
  id: string,
  payload: TaskPayload
): Promise<Task> => {
  const response = await api.put<ApiListResponse<Task>>(
    `/tasks/${id}`,
    payload
  );
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTaskStatus = async (id: string): Promise<Task> => {
  const response = await api.patch<ApiListResponse<Task>>(
    `/tasks/${id}/toggle`
  );
  return response.data.data;
};

