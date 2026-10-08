import type { IClient } from "../interfaces/IClient";
import type { IProject } from "../interfaces/IProject";
import type { ITask } from "../interfaces/ITask";
import type { ProjectStatus } from "../types/ProjectTypes";

export class Project implements IProject {
  private readonly _tasks: ITask[] = [];
  private _status: ProjectStatus = "PLANNED";
  constructor(
    public readonly id: number,
    public title: string,
    public client: IClient,
    public budget: number,
    public startDate: Date,
    public deadline: Date,
  ) {}

  get tasks(): ITask[] {
    return [...this._tasks];
  }

  get status(): ProjectStatus {
    return this._status;
  }

  addTask(task: ITask): void {
    this._tasks.push(task);
  }

  getTotalEstimatedHours(): number {
    return this._tasks.reduce((total, task) => total + task.estimatedHours, 0);
  }

  getCompletionPercentage(): number {
    if (this._tasks.length === 0) {
      return 0;
    }
    const completedTasks = this._tasks.filter(
      (task) => task.status === "COMPLETED",
    ).length;
    return (completedTasks / this._tasks.length) * 100;
  }

  private areAllTasksCompleted(): boolean {
    return (
      this._tasks.length > 0 &&
      this._tasks.every((task) => task.status === "COMPLETED")
    );
  }

  changeStatus(newStatus: ProjectStatus): boolean {
    if (newStatus === "COMPLETED" && !this.areAllTasksCompleted()) {
      return false;
    }
    this._status = newStatus;
    return true;
  }
}
