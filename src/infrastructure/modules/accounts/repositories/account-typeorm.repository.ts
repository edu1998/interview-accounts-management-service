import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../../../domain/repositories/account.repository';
import { AccountTypeormEntity } from '../entities/account-typeorm.entity';
import { Repository } from 'typeorm';
import { Account } from '../../../../domain/entities/account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountTypeormRepository implements AccountRepository {
  constructor(
    @InjectRepository(AccountTypeormEntity)
    private readonly repo: Repository<AccountTypeormEntity>,
  ) {}

  async save(account: Account): Promise<Account> {
    const ormEntity = this.toOrmEntity(account);
    const saved = await this.repo.save(ormEntity);
    return this.toDomainEntity(saved);
  }

  async findById(id: string): Promise<Account | null> {
    const ormEntity = await this.repo.findOne({ where: { id } });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async findAll(): Promise<Account[]> {
    const accounts = await this.repo.find();
    return accounts.map((account) => this.toDomainEntity(account));
  }

  private toOrmEntity(account: Account): AccountTypeormEntity {
    const orm = new AccountTypeormEntity();
    if (account.id) orm.id = account.id;
    orm.holderName = account.holderName;
    orm.balance = account.getBalance();
    return orm;
  }

  private toDomainEntity(orm: AccountTypeormEntity): Account {
    return Account.hydrate(
      orm.id,
      orm.holderName,
      orm.accountNum,
      Number(orm.balance),
    );
  }
}
