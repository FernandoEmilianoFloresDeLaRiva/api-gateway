import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TRANSPORT_CONSTANTS } from '../constants/transports.constant';
import { envsValues } from '../config/get-envs-values';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSPORT_CONSTANTS.AUTH,
        transport: Transport.TCP,
        options: {
          host: envsValues.AUTH_HOST,
          port: envsValues.AUTH_PORT,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: TRANSPORT_CONSTANTS.AUTH,
        transport: Transport.TCP,
        options: {
          host: envsValues.AUTH_HOST,
          port: envsValues.AUTH_PORT,
        },
      },
    ]),
  ],
})
export class AuthTransport {}
