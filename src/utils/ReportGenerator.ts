import type { IReport } from "../interfaces/IReport";
import type { Invoice } from "../models/Invoice";
import type { Project } from "../models/Project";
import type { ClientManager } from "../services/ClientManager";
import type { InvoiceManager } from "../services/InvoiceManager";
import type { ProjectManager } from "../services/ProjectManager";

export function generateProjectSummary(
  project: Project,
  invoices: Invoice[],
): string {
  const relatedInvoices = invoices.filter(
    (invoice) => invoice.projectId === project.id,
  );

  const tasks = project.tasks;

  const taskSummary =
    tasks.length === 0
      ? "No Task"
      : tasks
          .map(
            (task) =>
              `${task.status === "COMPLETED" ? "✓" : "✗"} ${task.title}`,
          )
          .join("\n");

  const invoiceSummary =
    relatedInvoices.length === 0
      ? "No Invoice"
      : relatedInvoices
          .map(
            (invoice) =>
              `${invoice.amount.toLocaleString("tr-TR")} TL / ${invoice.status}`,
          )
          .join("\n");

  const formattedCompletionPercentage = Number(
    project.getCompletionPercentage().toFixed(2),
  );

  const totalEstimatedHours = project.getTotalEstimatedHours();

  const formattedBudget = project.budget.toLocaleString("tr-TR");

  const projectSummary = `
Project: ${project.title}

Client: ${project.client.companyName}

Budget: ${formattedBudget} TL
    
Tasks:
${taskSummary}
    
Status: ${project.status}

Completion: ${formattedCompletionPercentage}%

Estimated Work: ${totalEstimatedHours} hours

Invoices:
${invoiceSummary}
`;

  return projectSummary;
}

export function generateDashboardReport(
  clientManager: ClientManager,
  projectManager: ProjectManager,
  invoiceManager: InvoiceManager,
): string {
  const allProjects = projectManager.getAllProjects();

  const reportData: IReport = {
    totalClients: clientManager.getAllClients().length,
    totalProjects: allProjects.length,
    activeProjects: projectManager.getActiveProjects().length,
    completedProjects: projectManager.getCompletedProjects().length,

    plannedProjects: allProjects.filter(
      (project) => project.status === "PLANNED",
    ).length,

    cancelledProjects: allProjects.filter(
      (project) => project.status === "CANCELLED",
    ).length,

    totalProjectValue: allProjects.reduce(
      (total, project) => total + project.budget,
      0,
    ),

    totalInvoiced: invoiceManager.getTotalInvoiced(),
    totalCollected: invoiceManager.getTotalCollected(),
  };

  const formattedTotalProjectValue =
    reportData.totalProjectValue.toLocaleString("tr-TR");

  const formattedTotalInvoiced =
    reportData.totalInvoiced.toLocaleString("tr-TR");

  const formattedTotalCollected =
    reportData.totalCollected.toLocaleString("tr-TR");

  const dashboardReport = `
========== FREELANCE DASHBOARD ==========

Clients: ${reportData.totalClients}
Projects: ${reportData.totalProjects}

Active Projects: ${reportData.activeProjects}
Completed Projects: ${reportData.completedProjects}
Planned Projects: ${reportData.plannedProjects}
Cancelled Projects: ${reportData.cancelledProjects}

Total Project Value: ${formattedTotalProjectValue} TL

Total Invoiced:
${formattedTotalInvoiced} TL

Total Collected:
${formattedTotalCollected} TL
==========================================
`;
  return dashboardReport;
}
