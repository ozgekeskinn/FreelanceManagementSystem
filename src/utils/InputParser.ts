import type { ProjectStatus } from "../types/ProjectTypes";

export function parseProjectStatus(value: unknown): ProjectStatus {
  if (
    typeof value === "string" &&
    (value === "PLANNED" ||
      value === "ACTIVE" ||
      value === "COMPLETED" ||
      value === "CANCELLED")
  ) {
    return value as ProjectStatus;
  }

  throw new Error("Geçersiz proje durumu.");
}
