import { Module } from '@nestjs/common';
import { HealthController } from './common/health/health.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HealthController],
})
export class AppModule {}
