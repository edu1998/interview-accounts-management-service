import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../../application/dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    console.log('Service: Creating transaction with data:', createTransactionDto);
    return { message: 'Service: Endpoint to create a new transaction.', data: createTransactionDto };
  }

  findAllByAccountId(accountId: string) {
    console.log(`Service: Listing all transactions for account ${accountId}.`);
    return { message: `Service: Transactions for account ${accountId}.`, data: [] };
  }
}
