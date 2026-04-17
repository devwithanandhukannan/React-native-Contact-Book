import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS with explicit configuration for DELETE requests
  app.enableCors({
    origin: '*', // Allow all origins (or specify: ['http://localhost:3000', 'http://192.168.0.242:3000'])
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly allow DELETE
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  // Enables automatic validation (checking DTOs)
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000, '0.0.0.0'); // Runs on port 3000
  console.log('🚀 Backend is running on http://localhost:3000');
}
bootstrap();