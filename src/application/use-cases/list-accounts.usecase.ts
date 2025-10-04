import { AccountRepository } from '../../domain/repositories/account.repository';
import { UseCases } from '../../resources/interfaces/use-cases-contract.interface';
import { Account } from '../../domain/entities/account.entity';

export class ListAccountsUseCase implements UseCases<Promise<Account[]>> {
  constructor(private readonly accountRepository: AccountRepository) {}

  execute() {
    return this.accountRepository.findAll();
  }
}
