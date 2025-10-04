import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionTypeormEntity } from '../entities/transaction-typeorm.entity';
import { Repository } from 'typeorm';
import { Transaction } from '../../../../domain/entities/transaction.entity';

@Injectable()
export class TransactionTypeormRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionTypeormEntity)
    private readonly repo: Repository<TransactionTypeormEntity>,
  ) {}

  async save(transaction: Transaction): Promise<Transaction> {
    const ormEntity = this.toOrmEntity(transaction);
    const saved = await this.repo.save(ormEntity);
    return this.toDomainEntity(saved);
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    const ormEntities = await this.repo.find({ where: { accountId } });
    return ormEntities.map((trans) => this.toDomainEntity(trans));
  }

  private toOrmEntity(transaction: Transaction): TransactionTypeormEntity {
    const orm = new TransactionTypeormEntity();
    if (transaction.id) orm.id = transaction.id;
    orm.accountId = transaction.accountId;
    orm.amount = transaction.amount;
    orm.type = transaction.type;
    return orm;
  }

  private toDomainEntity(orm: TransactionTypeormEntity): Transaction {
    return Transaction.hydrate(
      orm.id,
      orm.accountId,
      orm.type,
      Number(orm.amount),
    );
  }
}
