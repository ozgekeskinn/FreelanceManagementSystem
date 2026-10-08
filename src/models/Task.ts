import type { ITask } from "../interfaces/ITask";
import type { TaskStatus, TaskPriority } from "../types/TaskTypes";

export class Task implements ITask {
  constructor(
    public readonly id: number,
    public title: string,
    public description: string,
    public priority: TaskPriority,
    private _status: TaskStatus,
    public estimatedHours: number,
  ) {}

  get status(): TaskStatus {
    return this._status;
  }

  changeStatus(newStatus: TaskStatus): void {
    this._status = newStatus;
  }

  isCompleted(): boolean {
    return this._status === "COMPLETED";
  }
}
