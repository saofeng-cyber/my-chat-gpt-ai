import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
interface HttpExceptionResponse {
  statusCode: string;
  message: any;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    const req: Request = ctx.getRequest();
    const status = exception.getStatus();
    const { message } = exception.getResponse() as HttpExceptionResponse;
    this.logger.error(message);
    res.status(status).json({
      success: false,
      time: new Date().toLocaleString(),
      data: message,
      status,
      path: req.url,
    });
  }
}
