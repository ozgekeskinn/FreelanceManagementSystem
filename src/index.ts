import { loadMockData } from "./data/mockData";

import { ClientManager } from "./services/ClientManager";
import { InvoiceManager } from "./services/InvoiceManager";
import { ProjectManager } from "./services/ProjectManager";

import { parseProjectStatus } from "./utils/InputParser";
import {
  generateDashboardReport,
  generateProjectSummary,
} from "./utils/ReportGenerator";

const clientManager = new ClientManager();
const projectManager = new ProjectManager(clientManager);
const invoiceManager = new InvoiceManager(projectManager);

loadMockData(clientManager, projectManager, invoiceManager);

console.log(
  generateDashboardReport(clientManager, projectManager, invoiceManager),
);

const allInvoices = invoiceManager.getAllInvoices();

projectManager.getAllProjects().forEach((project) => {
  console.log(generateProjectSummary(project, allInvoices));
});

// TYPE ASSERTION
const externalStatus: unknown = "ACTIVE";
const parsedStatus = parseProjectStatus(externalStatus);
console.log(`Parsed external project status: ${parsedStatus}`);
