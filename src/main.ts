import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envsValues } from './common/config/get-envs-values';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RpcCustomException } from './common/exceptions/rpc-custom.exception';

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
  app.useGlobalFilters(new RpcCustomException());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway for the application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token value, without key "Bearer"',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(envsValues.PORT);
  logger.log(`Api Gateway is running on: ${await app.getUrl()}`);
}
bootstrap();
