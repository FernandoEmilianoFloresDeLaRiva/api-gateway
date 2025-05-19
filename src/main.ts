import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envsValues } from './common/config/get-envs-values';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('ApiGateway');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(app, {
      openapi: '3.0.0',
      info: {
        title: 'API Gateway',
        description: 'API Gateway for the application',
        version: '1.0',
      },
      servers: [
        {
          url: `http://localhost:${envsValues.PORT}`,
        },
      ],
    }),
  );
  await app.listen(envsValues.PORT);
  logger.log(`Api Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
