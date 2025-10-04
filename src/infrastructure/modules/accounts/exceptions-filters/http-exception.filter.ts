import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { GetTimeStringByTimeZone } from '../../../../resources/utils/GetTimeStringByTimeZone';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const time = GetTimeStringByTimeZone();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.error(exception); // create a custom log to show the errors in the console in a more stylized way

    response.status(status).json({
      statusCode: status,
      type: 'httpException',
      timestamp: time,
      path: request.url,
      message: exception?.message,
      fix:
        (exception?.getResponse() as any)?.message !== exception?.message
          ? (exception?.getResponse() as any)?.message
          : 'NOT_FIX_MESSAGE',
    });
  }
}
