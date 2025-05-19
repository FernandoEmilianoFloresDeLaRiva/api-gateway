import { Get, Controller, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return { status: 'ok' };
  }
}
