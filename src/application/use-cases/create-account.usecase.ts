import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';

export class CreateAccountUseCase {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(accountInfo: CreateAccountDto): Promise<Account> {
    const { accountHolderName: holderName, initialBalance } = accountInfo;
    const account = Account.create(holderName, initialBalance);
    return this.accountRepo.save(account);
  }
}
