import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envsValues } from './common/config/get-envs-values';

async function bootstrap() {
  const logger = new Logger('ApiGateway');
  const app = await NestFactory.create(AppModule);
  await app.listen(envsValues.PORT);
  logger.log(`Api Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
