export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export class CreateTransactionDto {
  accountId: string;
  type: TransactionType;
  amount: number;
}
