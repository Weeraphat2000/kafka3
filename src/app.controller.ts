import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { log } from 'console';
import { Cat } from './schemas/cat.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  @EventPattern('kafka3-test')
  getHello(body: any) {
    log('kafka3-test', body);
  }

  @EventPattern('receive-message')
  getHello2(body: any) {
    log('body', body);
  }

  /**
   * เมื่อ microservice ได้รับ message จาก topic "demo-topic"
   * ก็จะประมวลผลและ return เป็น response กลับไปให้ client
   */
  @MessagePattern('demo-topic')
  handleMessage(@Payload() message: any) {
    console.log('Microservice received:', message);

    // สามารถประมวลผลข้อความได้ตามต้องการ
    const data = message.message;
    const result = {
      originalData: data,
      reply: 'Hello from Kafka Microservice! na',
      timestamp: new Date().toISOString(),
    };

    // return ค่าได้เลย NestJS จะสร้าง response กลับอัตโนมัติ
    return result;
  }

  @MessagePattern('ping4')
  receiveMessage(@Payload() message: any) {
    console.log('Microservice received:', message);

    // สามารถประมวลผลข้อความได้ตามต้องการ
    const data = message.message;
    const result = {
      originalData: data,
      reply: 'Hello from Kafka Microservice! na',
      timestamp: new Date().toISOString(),
    };

    // return ค่าได้เลย NestJS จะสร้าง response กลับอัตโนมัติ
    return result;
  }

  @MessagePattern('getAllCat')
  async getAllCat() {
    log('getAllCat');
    return {
      cats: await this.catModel.find().exec(),
      message: 'Get all cat',
    };
  }
}
