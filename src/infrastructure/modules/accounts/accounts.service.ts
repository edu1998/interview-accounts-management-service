import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../../../application/dto/create-account.dto';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { CreateAccountUseCase } from '../../../application/use-cases/create-account.usecase';
import { GetAccountUseCase } from '../../../application/use-cases/get-account.usecase';
import { ListAccountsUseCase } from '../../../application/use-cases/list-accounts.usecase';

@Injectable()
export class AccountsService {
  constructor(private readonly accountRepository: AccountRepository) {}
  create(createAccountDto: CreateAccountDto) {
    const useCase = new CreateAccountUseCase(this.accountRepository);
    return useCase.execute(createAccountDto);
  }

  findAll() {
    const useCase = new ListAccountsUseCase(this.accountRepository);
    return useCase.execute();
  }

  findOne(id: string) {
    const useCase = new GetAccountUseCase(this.accountRepository);
    return useCase.execute(id);
  }
}
