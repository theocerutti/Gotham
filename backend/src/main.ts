import {NestFactory, Reflector} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set /api route everywhere
  app.setGlobalPrefix("/api");

  // Setup class-validator
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle("Time Manager")
    .setDescription("EPITECH Project: A clone of Clockify!")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  // Enable Cors
  app.enableCors({
    origin: true,
    methods: "*",
    allowedHeaders: "*",
    exposedHeaders: "*",
    credentials: true,
  });
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
