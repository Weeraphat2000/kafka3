import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'], // ระบุ broker ของ Kafka
        },
        consumer: {
          groupId: 'kafka3-consumer', // กำหนดชื่อกลุ่มของ Consumer เพื่อให้ Kafka จดจำว่าข้อมูลที่ถูกส่งไปถูกส่งไปยัง Consumer นี้
        },
      },
    },
  );

  app.listen();
  log('Microservice is listening...');
}
bootstrap();
