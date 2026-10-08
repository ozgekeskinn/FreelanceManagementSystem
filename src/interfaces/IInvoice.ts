import { InvoiceStatus } from "../types/InvoiceTypes";

export interface IInvoice {
  readonly id: number;
  readonly projectId: number;
  amount: number;
  status: InvoiceStatus;
}
