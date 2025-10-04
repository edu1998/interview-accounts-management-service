import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateAccountDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @IsDefined()
  @IsNumber()
  @Min(1)
  initialBalance: number;
}
