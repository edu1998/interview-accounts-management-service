import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { validate } from 'class-validator';
import { Observable } from 'rxjs';

export interface Response {
  data: any;
  message: string;
  code?: number;
}

@Injectable()
export class ResponseGenericInterceptor implements NestInterceptor {
  private static checkMessage(verboseMethod: string): {
    message: string;
    code: number;
  } {
    switch (verboseMethod) {
      case 'POST':
        return { message: 'Resource successfully created', code: 201 };
      case 'GET':
        return { message: 'Resource successfully access', code: 200 };
      case 'PUT':
      case 'PATCH':
        return { message: 'Resource successfully update', code: 200 };
      case 'DELETE':
        return { message: 'Resource successfully remove', code: 200 };
      default:
        return { message: 'Resource successfully access', code: 200 };
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const [req] = context.getArgs();
    return next.handle().pipe(
      map((response) => {
        return {
          data: response,
          ...ResponseGenericInterceptor.checkMessage(req.method),
        };
      }),
    );
  }
}
