import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetTimeStringByTimeZone } from '../../../../resources/utils/GetTimeStringByTimeZone';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const time = GetTimeStringByTimeZone();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error(exception); // create a custom log to show the errors in the console in a more stylized way

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL_SERVER_ERROR',
      type: 'ServerError',
      timestamp: time,
      path: request.url,
      description: exception.message, // use to env variable for show description only in local
    });
  }
}
