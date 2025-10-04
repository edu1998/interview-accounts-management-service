import { registerAs } from '@nestjs/config';

export default registerAs('SYSTEM', () => ({
  PORT: parseInt(process.env.PORT as string),
  NODE_ENV: process.env.NODE_ENV,
}));
