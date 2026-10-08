import type { ProjectStatus } from "../types/ProjectTypes";
import type { IClient } from "./IClient";
import type { ITask } from "./ITask";

export interface IProject {
  readonly id: number;
  title: string;
  client: IClient;
  budget: number;
  startDate: Date;
  deadline: Date;
  status: ProjectStatus;
  tasks: ITask[];
}
