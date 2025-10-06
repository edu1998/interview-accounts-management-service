import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountTypeormEntity } from '../../accounts/entities/account-typeorm.entity';
import { TransactionType } from '../../../../resources/enums/transaction-type.enum';

@Entity('transactions')
export class TransactionTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @ManyToOne(() => AccountTypeormEntity, (account) => account.transactions, {
    onDelete: 'CASCADE',
  })
  account: AccountTypeormEntity;
}
