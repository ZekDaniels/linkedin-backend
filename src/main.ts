import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Linkedin Backend')
    .setDescription('Linkedin Backend API description')
    .setVersion('1.0')
    .addTag('linkedin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swg/api', app, document);

  await app.listen(3000);
}
bootstrap();
