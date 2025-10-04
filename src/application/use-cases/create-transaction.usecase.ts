import { UseCases } from '../../resources/interfaces/use-cases-contract.interface';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export class CreateTransactionUseCase
  implements UseCases<Promise<Transaction>>
{
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const { accountId, type, amount } = transactionDto;
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    const transaction = Transaction.create(accountId, type, amount);
    transaction.applyTo(account);
    await this.accountRepository.save(account);
    return this.transactionRepository.save(transaction);
  }
}
