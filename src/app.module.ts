import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Cat, CatSchema } from './schemas/cat.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigModule ใช้ได้ทั่วทั้งแอป
      envFilePath: '.env', // ระบุไฟล์ .env (ค่าเริ่มต้นคือ .env)
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), // ใช้ MongooseModule ในการเชื่อมต่อกับ MongoDB
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
