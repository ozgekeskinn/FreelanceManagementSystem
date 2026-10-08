import type { IClient } from "../interfaces/IClient";
import type { IProject } from "../interfaces/IProject";
import type { ClientStatus } from "../types/ClientTypes";

export class Client implements IClient {
  private readonly _projects: IProject[] = [];

  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public companyName: string,
    public status: ClientStatus,
  ) {}

  get projects(): IProject[] {
    return [...this._projects];
  }

  addProject(project: IProject): void {
    this._projects.push(project);
  }

  getTotalProjectValue(): number {
    return this._projects.reduce((total, project) => total + project.budget, 0);
  }
}
