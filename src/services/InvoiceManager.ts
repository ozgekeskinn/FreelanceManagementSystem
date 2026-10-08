import { Invoice } from "../models/Invoice";
import type { ProjectManager } from "./ProjectManager";

export class InvoiceManager {
  private readonly _invoices: Invoice[] = [];

  constructor(private readonly projectManager: ProjectManager) {}

  private invoiceExists(id: number): boolean {
    return this._invoices.some((invoice) => invoice.id === id);
  }

  getInvoiceById(id: number): Invoice | undefined {
    return this._invoices.find((invoice) => invoice.id === id);
  }

  getAllInvoices(): Invoice[] {
    return [...this._invoices];
  }

  createInvoice(id: number, projectId: number, amount: number): Invoice {
    if (this.invoiceExists(id)) {
      throw new Error("Bu ID'ye sahip bir fatura zaten mevcut.");
    }

    if (this.projectManager.getProjectById(projectId) === undefined) {
      throw new Error("Bu ID'ye sahip bir proje mevcut değil.");
    }

    const newInvoice = new Invoice(id, projectId, amount);
    this._invoices.push(newInvoice);
    return newInvoice;
  }

  markInvoiceAsPaid(id: number): void {
    const invoice = this.getInvoiceById(id);
    if (!invoice) {
      throw new Error("Bu ID'ye sahip bir fatura mevcut değil.");
    }
    invoice.markAsPaid();
  }

  getUnpaidInvoices(): Invoice[] {
    return this._invoices.filter((invoice) => invoice.status === "UNPAID");
  }

  getTotalCollected(): number {
    const paidInvoices = this._invoices.filter(
      (invoice) => invoice.status === "PAID",
    );

    return paidInvoices.reduce((total, invoice) => total + invoice.amount, 0);
  }

  getTotalInvoiced(): number {
    return this._invoices.reduce((total, invoice) => total + invoice.amount, 0);
  }
}
