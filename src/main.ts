import { Logger, ValidationPipe }          from '@nestjs/common';
import { DocumentBuilder, SwaggerModule }  from '@nestjs/swagger';
import { NestFactory }                     from '@nestjs/core';
import { AppModule }                       from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //*HABILITACIÓN DE GLOBAL PREFIX PARA LAS API
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //*CONFIGURACIONES DE SWAGGER PARA LA DOCUMENTACIÓN API
  const config = new DocumentBuilder()
    .setTitle('WAYNA API')
    .setDescription('API DEL SISTEMA WAYNA')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.NEST_PORT);
  Logger.log(`App running on port: ${process.env.NEST_PORT}`);
}
bootstrap();
