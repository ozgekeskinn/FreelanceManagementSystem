import { ProjectStatus } from "../types/ProjectTypes";
import { IClient } from "./IClient";
import { ITask } from "./ITask";

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
