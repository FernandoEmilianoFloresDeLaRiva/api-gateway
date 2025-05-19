import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TRANSPORT_CONSTANTS } from '../constants/transports.constant';
import { envsValues } from '../config/get-envs-values';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSPORT_CONSTANTS.NOTES,
        transport: Transport.TCP,
        options: {
          host: envsValues.NOTES_HOST,
          port: envsValues.NOTES_PORT,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: TRANSPORT_CONSTANTS.NOTES,
        transport: Transport.TCP,
        options: {
          host: envsValues.NOTES_HOST,
          port: envsValues.NOTES_PORT,
        },
      },
    ]),
  ],
})
export class NoteTransport {}
