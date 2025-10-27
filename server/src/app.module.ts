// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường sẽ có sẵn ở mọi nơi
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UserModule,
    // Chúng ta sẽ thêm UserModule ở bước sau
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}