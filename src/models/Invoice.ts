import type { IInvoice } from "../interfaces/IInvoice";
import type { InvoiceStatus } from "../types/InvoiceTypes";

export class Invoice implements IInvoice {
  private _status: InvoiceStatus = "UNPAID";
  constructor(
    public readonly id: number,
    public readonly projectId: number,
    public amount: number,
  ) {}

  get status(): InvoiceStatus {
    return this._status;
  }

  markAsPaid(): void {
    this._status = "PAID";
  }

  isPaid(): boolean {
    return this._status === "PAID";
  }
}
