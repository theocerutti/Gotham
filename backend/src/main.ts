import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setup Swagger
/*  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);*/

  // Setup class-validator
  app.useGlobalPipes(new ValidationPipe());

  // Set /api route everywhere
  app.setGlobalPrefix('/api');
  await app.listen(4000);
}

bootstrap();
