import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Global Validation Pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    // All apis start with /api
    app.setGlobalPrefix('api', {
      exclude: ['health'],
    });

    // ===== Configure Swagger
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Contest API')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-docs', app, documentFactory);

    // Getting Config From Env
    const appConfig = app.get(AppConfig);
    await app.listen(appConfig.port);
    console.log('✅ Application running on Port ', appConfig.port);
  } catch (error) {
    console.log('❌ Error while starting the server');
    console.log(error);
    process.exit(1);
  }
}
bootstrap();
