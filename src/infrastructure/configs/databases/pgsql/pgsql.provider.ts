import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const PgsqlProvider: DynamicModule[] = [
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('DATABASE_POSTGRES.HOST'),
        port: configService.get<number>('DATABASE_POSTGRES.PORT'),
        username: configService.get('DATABASE_POSTGRES.USERNAME'),
        password: configService.get('DATABASE_POSTGRES.PASSWORD'),
        database: configService.get('DATABASE_POSTGRES.DATABASE'),
        logging: configService.get('DATABASE_POSTGRES.LOGGING_ORM'),
        entities: [__dirname + '/../../../../**/*.entity{.ts,.js}'],
      };
    },
  }),
];
