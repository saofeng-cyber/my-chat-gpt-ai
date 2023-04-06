import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

@Injectable()
export class SecretGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!process.env.SECRET_KEY) {
      throw new HttpException({ message: 'Missing secret' }, 401);
    }
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const { secret } = request.body;
    if (secret === process.env.SECRET_KEY) {
      return true;
    }
    if (!secret) throw new HttpException({ message: 'Missing secret' }, 401);
    return false;
  }
}
