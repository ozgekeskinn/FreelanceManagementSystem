import type { Client } from "../models/Client";

export class ClientManager {
  private readonly _clients: Client[] = [];

  addClient(client: Client): void {
    if (this.clientExists(client.id)) {
      throw new Error("Bu ID'ye sahip bir müşteri zaten mevcut.");
    }

    this._clients.push(client);
  }

  getAllClients(): Client[] {
    return [...this._clients];
  }

  getClientById(id: number): Client | undefined {
    return this._clients.find((client) => client.id === id);
  }

  private clientExists(id: number): boolean {
    return this._clients.some((client) => client.id === id);
  }
}
