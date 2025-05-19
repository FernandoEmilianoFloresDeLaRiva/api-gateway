import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { TRANSPORT_CONSTANTS } from 'src/common/constants/transports.constant';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(TRANSPORT_CONSTANTS.AUTH) private readonly client: ClientProxy,
  ) {}

  @Get('healthcheck')
  @HttpCode(HttpStatus.OK)
  async healthCheck() {
    return await this.client.send({ cmd: 'auth.healthcheck' }, {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() registerDto: RegisterDTO) {
    return await this.client
      .send({ cmd: 'auth.register.user' }, registerDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginDto: LoginDTO) {
    return await this.client.send({ cmd: 'auth.login.user' }, loginDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
