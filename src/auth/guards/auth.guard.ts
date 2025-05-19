import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { TRANSPORT_CONSTANTS } from 'src/common/constants/transports.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TRANSPORT_CONSTANTS.AUTH) private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token was not provided');
      }

      const { user, isExpired } = await firstValueFrom(
        this.client.send({ cmd: 'auth.validate.user' }, token),
      );

      if (isExpired) {
        throw new UnauthorizedException('Token expired');
      }

      request['user'] = user;
      request['token'] = token;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
