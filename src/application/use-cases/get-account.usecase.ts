import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';

export class GetAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(id: string): Promise<Account> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new Error(`Account with ID ${id} not found`);
    }
    return account;
  }
}
