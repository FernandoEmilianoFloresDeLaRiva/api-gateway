import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TRANSPORT_CONSTANTS } from 'src/common/constants/transports.constant';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(TRANSPORT_CONSTANTS.AUTH) private readonly client: ClientProxy,
  ) {}

  @Get('healthcheck')
  async healthCheck() {
    return await this.client.send({ cmd: 'auth.healthcheck' }, {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
