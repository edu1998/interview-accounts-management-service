import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  holderName!: string;

  @Column({
    type: 'bigint',
    default: () => "nextval('account_number_seq')",
    unique: true,
  })
  accountNum!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  balance!: number;
}
