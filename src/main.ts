import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { ResponseGenericInterceptor } from './infrastructure/interceptors/response-generic.interceptor';
import { ErrorExceptionFilter } from './infrastructure/modules/accounts/exceptions-filters/error-exception.filter';
import { HttpExceptionFilter } from './infrastructure/modules/accounts/exceptions-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseGenericInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
