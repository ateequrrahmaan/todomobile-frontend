export type Priority = "high" | "medium" | "low";
export type Status = "pending" | "completed";

export interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  overdue?: boolean;
}

export interface TaskPayload {
  title: string;
  description?: string;
  category?: string;
  priority?: Priority;
  status?: Status;
  dueDate: string;
}

