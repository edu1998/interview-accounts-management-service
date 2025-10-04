import { Account } from '../entities/account.entity';

export abstract class AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract save(account: Account): Promise<Account>;
  abstract findAll(): Promise<Account[]>;
}
