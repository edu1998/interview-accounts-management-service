import { registerAs } from '@nestjs/config';
import { getBoolean } from '../../../resources/utils/getBoolean';

export default registerAs('DATABASE_POSTGRES', () => ({
  HOST: process.env.POSTGRES_HOST || 'your_host',
  PORT: parseInt(process.env.POSTGRES_PORT as string) || 3306,
  USERNAME: process.env.POSTGRES_USERNAME || 'your_user_name',
  PASSWORD: process.env.POSTGRES_PASSWORD || 'your_password',
  DATABASE: process.env.POSTGRES_DATABASE || 'your_database_name',
  LOGGING_ORM: getBoolean(process.env.POSTGRES_LOGGING_ORM) || false,
}));
