import { Project } from "../models/Project";
import type { ClientManager } from "./ClientManager";

export class ProjectManager {
  private readonly _projects: Project[] = [];

  constructor(private readonly clientManager: ClientManager) {}

  private projectExists(id: number): boolean {
    return this._projects.some((project) => project.id === id);
  }

  getProjectById(id: number): Project | undefined {
    return this._projects.find((project) => project.id === id);
  }

  getAllProjects(): Project[] {
    return [...this._projects];
  }

  createProject(
    id: number,
    title: string,
    clientId: number,
    budget: number,
    startDate: Date,
    deadline: Date,
  ): Project {
    if (this.projectExists(id)) {
      throw new Error("Bu ID'ye sahip bir proje zaten mevcut.");
    }

    const client = this.clientManager.getClientById(clientId);

    if (!client) {
      throw new Error("Bu ID'ye sahip bir müşteri mevcut değil.");
    }

    const newProject = new Project(
      id,
      title,
      client,
      budget,
      startDate,
      deadline,
    );

    this._projects.push(newProject);
    client.addProject(newProject);
    return newProject;
  }

  getActiveProjects(): Project[] {
    return this._projects.filter((project) => project.status === "ACTIVE");
  }

  getCompletedProjects(): Project[] {
    return this._projects.filter((project) => project.status === "COMPLETED");
  }

  getProjectsByClient(clientId: number): Project[] {
    return this._projects.filter((project) => project.client.id === clientId);
  }

  getOverdueProjects(): Project[] {
    const currentDate = new Date();
    return this._projects.filter(
      (project) =>
        project.deadline < currentDate &&
        project.status !== "COMPLETED" &&
        project.status !== "CANCELLED",
    );
  }

  getHighestBudgetProject(): Project | undefined {
    if (this._projects.length === 0) {
      return undefined;
    }

    return this._projects.reduce((highest, project) => {
      return project.budget > highest.budget ? project : highest;
    });
  }
}
