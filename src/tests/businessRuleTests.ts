import { Client } from "../models/Client";
import { Task } from "../models/Task";

import { ClientManager } from "../services/ClientManager";
import { InvoiceManager } from "../services/InvoiceManager";
import { ProjectManager } from "../services/ProjectManager";

import { parseProjectStatus } from "../utils/InputParser";

export function runBusinessRuleTests(): void {
  console.log("\n========== BUSINESS RULE TESTS ==========\n");

  const clientManager = new ClientManager();
  const projectManager = new ProjectManager(clientManager);
  const invoiceManager = new InvoiceManager(projectManager);

  // TEST 1: Aynı Client ID iki kez eklenemez.
  console.log("TEST 1 - Duplicate Client ID");

  const client = new Client(
    1,
    "Test Client",
    "test@example.com",
    "Test Company",
    "ACTIVE",
  );

  clientManager.addClient(client);

  try {
    const duplicateClient = new Client(
      1,
      "Duplicate Client",
      "duplicate@example.com",
      "Duplicate Company",
      "ACTIVE",
    );

    clientManager.addClient(duplicateClient);

    console.log("FAILED: Duplicate client eklendi.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`PASSED: ${error.message}`);
    }
  }

  // TEST 2: Olmayan Client için Project oluşturulamaz.
  console.log("\nTEST 2 - Project With Invalid Client");

  try {
    projectManager.createProject(
      100,
      "Invalid Client Project",
      999,
      50000,
      new Date("2026-01-01"),
      new Date("2026-12-31"),
    );

    console.log("FAILED: Olmayan client için project oluşturuldu.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`PASSED: ${error.message}`);
    }
  }

  // Geçerli test projesi oluşturuluyor.
  const project = projectManager.createProject(
    1,
    "Test Project",
    1,
    75000,
    new Date("2026-01-01"),
    new Date("2026-12-31"),
  );

  // TEST 3: Aynı Project ID iki kez oluşturulamaz.
  console.log("\nTEST 3 - Duplicate Project ID");

  try {
    projectManager.createProject(
      1,
      "Duplicate Project",
      1,
      30000,
      new Date("2026-02-01"),
      new Date("2026-10-01"),
    );

    console.log("FAILED: Duplicate project oluşturuldu.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`PASSED: ${error.message}`);
    }
  }

  // TEST 4: Tamamlanmamış task varsa Project COMPLETED yapılamaz.
  console.log("\nTEST 4 - Complete Project With Incomplete Tasks");

  const task = new Task(
    1,
    "Test Task",
    "Business rule testi için oluşturulan task.",
    "HIGH",
    "TODO",
    10,
  );

  project.addTask(task);

  const completionResult = project.changeStatus("COMPLETED");

  if (completionResult === false && project.status !== "COMPLETED") {
    console.log(
      "PASSED: Tamamlanmamış task bulunan project COMPLETED yapılamadı.",
    );
  } else {
    console.log(
      "FAILED: Tamamlanmamış task bulunan project COMPLETED yapıldı.",
    );
  }

  // TEST 5: Olmayan Project için Invoice oluşturulamaz.
  console.log("\nTEST 5 - Invoice With Invalid Project");

  try {
    invoiceManager.createInvoice(100, 999, 10000);

    console.log("FAILED: Olmayan project için invoice oluşturuldu.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`PASSED: ${error.message}`);
    }
  }

  // Geçerli invoice oluşturuluyor.
  invoiceManager.createInvoice(1, project.id, 25000);

  // TEST 6: Aynı Invoice ID iki kez kullanılamaz.
  console.log("\nTEST 6 - Duplicate Invoice ID");

  try {
    invoiceManager.createInvoice(1, project.id, 15000);

    console.log("FAILED: Duplicate invoice oluşturuldu.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`PASSED: ${error.message}`);
    }
  }

  // TEST 7: Geçersiz external status kabul edilmemeli.
  console.log("\nTEST 7 - Invalid Project Status");

  const invalidExternalStatus: unknown = "FINISHED";

  try {
    parseProjectStatus(invalidExternalStatus);

    console.log("FAILED: Geçersiz project status kabul edildi.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`PASSED: ${error.message}`);
    }
  }

  // TEST 8: Tüm task'lar tamamlanınca Project COMPLETED yapılabilmeli.
  console.log("\nTEST 8 - Complete Project With Completed Tasks");

  task.changeStatus("COMPLETED");

  const validCompletionResult = project.changeStatus("COMPLETED");

  if (validCompletionResult === true && project.status === "COMPLETED") {
    console.log(
      "PASSED: Tüm task'lar tamamlandıktan sonra project COMPLETED yapıldı.",
    );
  } else {
    console.log(
      "FAILED: Tüm task'lar tamamlandığı halde project COMPLETED yapılamadı.",
    );
  }

  console.log("\n=========================================\n");
}
