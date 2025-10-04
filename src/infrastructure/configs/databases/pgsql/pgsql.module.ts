import { Module } from '@nestjs/common';
import { PgsqlProvider } from './pgsql.provider';
import { ConfigModule } from '@nestjs/config';
import DatabasePostgresEnv from '../../env/database-postgres.env';

@Module({
  imports: [ConfigModule.forFeature(DatabasePostgresEnv), ...PgsqlProvider], // todo: find out which .env file loads with the forFeature
  exports: [...PgsqlProvider],
})
export class PgsqlModule {}
