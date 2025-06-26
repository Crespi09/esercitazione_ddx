import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Abilita CORS
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
