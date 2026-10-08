import type { TaskPriority, TaskStatus } from "../types/TaskTypes";

export interface ITask {
  readonly id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedHours: number;
}
