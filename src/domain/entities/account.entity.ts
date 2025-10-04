import { randomUUID } from 'crypto'; // Para generar IDs

export class Account {
  private constructor(
    public readonly id: string | null,
    public holderName: string,
    private balance: number,
    public accountNum: string | null,
  ) {}

  public static create(holderName: string, initialBalance: number): Account {
    return new Account(null, holderName, initialBalance, null);
  }

  public static hydrate(
    id: string,
    holderName: string,
    accountNum: string,
    balance: number,
  ): Account {
    return new Account(id, holderName, balance, accountNum);
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('El depósito debe ser positivo');
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error('El retiro debe ser positivo');
    if (this.balance < amount) throw new Error('Saldo insuficiente');
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
