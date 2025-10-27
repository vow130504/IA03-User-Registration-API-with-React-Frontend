// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Thêm dòng này

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt CORS [cite: 23]
  app.enableCors({
    origin: 'http://localhost:5173', // Địa chỉ của React frontend
  });

  // Kích hoạt Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Tự động loại bỏ các thuộc tính không có trong DTO
    transform: true, // Tự động chuyển đổi kiểu dữ liệu (ví dụ: string sang number)
  }));

  await app.listen(3000); // Backend sẽ chạy ở cổng 3000
}
bootstrap();