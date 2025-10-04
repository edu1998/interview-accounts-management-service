import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../../../application/dto/create-transaction.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('account/:accountId')
  @UseGuards(JwtAuthGuard)
  findAll(@Param('accountId') accountId: string) {
    return this.transactionsService.findAllByAccountId(accountId);
  }
}
