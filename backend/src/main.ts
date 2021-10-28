import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set /api route everywhere
  app.setGlobalPrefix('/api');

  // Setup class-validator
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('TimeManger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT);
}

bootstrap();
