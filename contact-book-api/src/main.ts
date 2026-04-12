import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // IMPORTANT: Allows React Native to connect
  app.enableCors();
  
  // Enables automatic validation (checking DTOs)
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000, '0.0.0.0'); // Runs on port 3000
  console.log('🚀 Backend is running on http://localhost:3000');
}
bootstrap();