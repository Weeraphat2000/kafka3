import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CateDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsNumber()
  age: number;

  @Prop()
  @IsString()
  breed: string;
}

export class UpdateCatDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  breed?: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
