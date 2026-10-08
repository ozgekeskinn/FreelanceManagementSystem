import { Client } from "../models/Client";
import { Task } from "../models/Task";

import type { ClientManager } from "../services/ClientManager";
import type { ProjectManager } from "../services/ProjectManager";
import type { InvoiceManager } from "../services/InvoiceManager";

export function loadMockData(
  clientManager: ClientManager,
  projectManager: ProjectManager,
  invoiceManager: InvoiceManager,
): void {
  // CLIENTS

  const client1 = new Client(
    1,
    "Ahmet Yılmaz",
    "ahmet@abcteknoloji.com",
    "ABC Teknoloji",
    "ACTIVE",
  );

  const client2 = new Client(
    2,
    "Elif Demir",
    "elif@novadigital.com",
    "Nova Digital",
    "ACTIVE",
  );

  const client3 = new Client(
    3,
    "Mert Kaya",
    "mert@pixelworks.com",
    "PixelWorks",
    "ACTIVE",
  );

  clientManager.addClient(client1);
  clientManager.addClient(client2);
  clientManager.addClient(client3);

  // PROJECTS
  // Toplam bütçe: 485.000 TL

  const project1 = projectManager.createProject(
    1,
    "E-Commerce Website",
    1,
    120000,
    new Date("2026-07-01"),
    new Date("2026-09-30"),
  );

  const project2 = projectManager.createProject(
    2,
    "Corporate Website",
    1,
    55000,
    new Date("2026-04-01"),
    new Date("2026-06-30"),
  );

  const project3 = projectManager.createProject(
    3,
    "Mobile Application",
    1,
    95000,
    new Date("2026-08-01"),
    new Date("2027-01-15"),
  );

  const project4 = projectManager.createProject(
    4,
    "Admin Dashboard",
    2,
    65000,
    new Date("2026-03-15"),
    new Date("2026-07-15"),
  );

  const project5 = projectManager.createProject(
    5,
    "CRM System",
    2,
    80000,
    new Date("2026-09-01"),
    new Date("2027-02-01"),
  );

  const project6 = projectManager.createProject(
    6,
    "Portfolio Website",
    3,
    30000,
    new Date("2026-11-01"),
    new Date("2027-01-01"),
  );

  const project7 = projectManager.createProject(
    7,
    "Booking Platform",
    3,
    40000,
    new Date("2026-05-01"),
    new Date("2026-12-01"),
  );

  // TASKS - PROJECT 1
  // 4 Task

  project1.addTask(
    new Task(
      1,
      "UI Tasarımı",
      "E-ticaret arayüz tasarımının hazırlanması.",
      "HIGH",
      "COMPLETED",
      18,
    ),
  );

  project1.addTask(
    new Task(
      2,
      "Authentication",
      "Kullanıcı giriş ve kayıt sisteminin geliştirilmesi.",
      "HIGH",
      "COMPLETED",
      20,
    ),
  );

  project1.addTask(
    new Task(
      3,
      "Product Management",
      "Ürün yönetim modülünün geliştirilmesi.",
      "MEDIUM",
      "IN_PROGRESS",
      28,
    ),
  );

  project1.addTask(
    new Task(
      4,
      "Payment System",
      "Ödeme altyapısının hazırlanması.",
      "CRITICAL",
      "TODO",
      28,
    ),
  );

  // TASKS - PROJECT 2
  // 3 Task

  project2.addTask(
    new Task(
      5,
      "Corporate UI",
      "Kurumsal web sitesi arayüzünün hazırlanması.",
      "MEDIUM",
      "COMPLETED",
      12,
    ),
  );

  project2.addTask(
    new Task(
      6,
      "Content Pages",
      "Kurumsal içerik sayfalarının geliştirilmesi.",
      "LOW",
      "COMPLETED",
      10,
    ),
  );

  project2.addTask(
    new Task(
      7,
      "Contact Form",
      "İletişim formunun geliştirilmesi.",
      "MEDIUM",
      "COMPLETED",
      8,
    ),
  );

  // TASKS - PROJECT 3
  // 4 Task

  project3.addTask(
    new Task(
      8,
      "Mobile UI",
      "Mobil uygulama ekranlarının hazırlanması.",
      "HIGH",
      "COMPLETED",
      20,
    ),
  );

  project3.addTask(
    new Task(
      9,
      "User Profile",
      "Kullanıcı profil ekranlarının geliştirilmesi.",
      "MEDIUM",
      "COMPLETED",
      14,
    ),
  );

  project3.addTask(
    new Task(
      10,
      "Push Notifications",
      "Bildirim sisteminin geliştirilmesi.",
      "HIGH",
      "IN_PROGRESS",
      18,
    ),
  );

  project3.addTask(
    new Task(
      11,
      "Application Testing",
      "Mobil uygulama testlerinin gerçekleştirilmesi.",
      "HIGH",
      "TODO",
      16,
    ),
  );

  // TASKS - PROJECT 4
  // 4 Task

  project4.addTask(
    new Task(
      12,
      "Dashboard Layout",
      "Dashboard temel arayüzünün hazırlanması.",
      "MEDIUM",
      "COMPLETED",
      14,
    ),
  );

  project4.addTask(
    new Task(
      13,
      "User Management",
      "Kullanıcı yönetim ekranlarının geliştirilmesi.",
      "HIGH",
      "COMPLETED",
      20,
    ),
  );

  project4.addTask(
    new Task(
      14,
      "Statistics",
      "İstatistik ekranlarının geliştirilmesi.",
      "MEDIUM",
      "COMPLETED",
      16,
    ),
  );

  project4.addTask(
    new Task(
      15,
      "Dashboard Testing",
      "Dashboard testlerinin tamamlanması.",
      "HIGH",
      "COMPLETED",
      10,
    ),
  );

  // TASKS - PROJECT 5
  // 4 Task

  project5.addTask(
    new Task(
      16,
      "Customer Module",
      "Müşteri yönetim modülünün geliştirilmesi.",
      "HIGH",
      "COMPLETED",
      24,
    ),
  );

  project5.addTask(
    new Task(
      17,
      "Sales Module",
      "Satış takip modülünün geliştirilmesi.",
      "HIGH",
      "COMPLETED",
      22,
    ),
  );

  project5.addTask(
    new Task(
      18,
      "Reporting Module",
      "CRM raporlama modülünün geliştirilmesi.",
      "MEDIUM",
      "IN_PROGRESS",
      18,
    ),
  );

  project5.addTask(
    new Task(
      19,
      "CRM Testing",
      "CRM sistem testlerinin gerçekleştirilmesi.",
      "MEDIUM",
      "TODO",
      12,
    ),
  );

  // TASKS - PROJECT 6
  // 3 Task

  project6.addTask(
    new Task(
      20,
      "Portfolio Design",
      "Portfolyo tasarımının hazırlanması.",
      "MEDIUM",
      "TODO",
      10,
    ),
  );

  project6.addTask(
    new Task(
      21,
      "Projects Section",
      "Projeler bölümünün geliştirilmesi.",
      "MEDIUM",
      "TODO",
      12,
    ),
  );

  project6.addTask(
    new Task(
      22,
      "Contact Section",
      "İletişim bölümünün geliştirilmesi.",
      "LOW",
      "TODO",
      6,
    ),
  );

  // TASKS - PROJECT 7
  // 3 Task

  project7.addTask(
    new Task(
      23,
      "Reservation UI",
      "Rezervasyon arayüzünün hazırlanması.",
      "HIGH",
      "COMPLETED",
      18,
    ),
  );

  project7.addTask(
    new Task(
      24,
      "Availability System",
      "Uygunluk kontrol sisteminin geliştirilmesi.",
      "HIGH",
      "TODO",
      20,
    ),
  );

  project7.addTask(
    new Task(
      25,
      "Booking Payment",
      "Rezervasyon ödeme sisteminin geliştirilmesi.",
      "CRITICAL",
      "TODO",
      22,
    ),
  );

  // PROJECT STATUSES
  //
  // ACTIVE:    3
  // COMPLETED: 2
  // PLANNED:   1
  // CANCELLED: 1

  project1.changeStatus("ACTIVE");

  project2.changeStatus("COMPLETED");

  project3.changeStatus("ACTIVE");

  project4.changeStatus("COMPLETED");

  project5.changeStatus("ACTIVE");

  // project6 zaten PLANNED olarak başlıyor.

  project7.changeStatus("CANCELLED");

  // INVOICES
  //
  // Total Invoiced:  320.000 TL
  // Total Collected: 210.000 TL

  invoiceManager.createInvoice(1, 1, 60000);
  invoiceManager.createInvoice(2, 1, 40000);
  invoiceManager.createInvoice(3, 2, 55000);
  invoiceManager.createInvoice(4, 3, 50000);
  invoiceManager.createInvoice(5, 4, 45000);
  invoiceManager.createInvoice(6, 5, 30000);
  invoiceManager.createInvoice(7, 6, 20000);
  invoiceManager.createInvoice(8, 7, 20000);

  // Toplam tahsil edilen: 210.000 TL
  invoiceManager.markInvoiceAsPaid(1); // 60.000
  invoiceManager.markInvoiceAsPaid(3); // 55.000
  invoiceManager.markInvoiceAsPaid(4); // 50.000
  invoiceManager.markInvoiceAsPaid(5); // 45.000
}
