import { IClient } from "../interfaces/IClient";
import { IProject } from "../interfaces/IProject";
import { ClientStatus } from "../types/ClientTypes";

export class Client implements IClient {
  private _projects: IProject[] = [];

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
