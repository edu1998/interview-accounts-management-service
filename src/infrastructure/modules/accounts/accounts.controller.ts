import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from '../../../application/dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }
}
