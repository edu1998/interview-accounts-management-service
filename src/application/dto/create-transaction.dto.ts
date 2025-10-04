import { TransactionType } from '../../resources/enums/transaction-type.enum';
import { IsDefined, IsEnum, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsDefined()
  accountId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @Min(1)
  amount: number;
}
