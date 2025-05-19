import { Module } from '@nestjs/common';
import { AuthTransport } from 'src/common/transports/auth.transport';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthTransport],
  controllers: [AuthController],
})
export class AuthModule {}
