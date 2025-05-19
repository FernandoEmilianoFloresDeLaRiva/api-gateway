import { Module } from '@nestjs/common';
import { HealthController } from './common/health/health.controller';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [AuthModule, NotesModule],
  controllers: [HealthController],
})
export class AppModule {}
