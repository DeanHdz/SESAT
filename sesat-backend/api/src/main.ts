import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //limite para body-size de una solicitud (default es 100kb en nestjs)
  //Ver:
  //https://stackoverflow.com/questions/61883168/set-request-body-size-limit-on-nestjs-for-single-controller
  //app.use('/send-pdf', json({ limit: '10mb' }));
  app.use(json({ limit: '10mb' }));
  await app.listen(3000);
}
bootstrap();
