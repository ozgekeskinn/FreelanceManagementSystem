import type { ClientStatus } from "../types/ClientTypes";
import type { IProject } from "./IProject";

export interface IClient {
  readonly id: number;
  name: string;
  email: string;
  companyName: string;
  status: ClientStatus;
  projects: IProject[];
}
