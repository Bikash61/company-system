// src/portfolio/schemas/portfolio-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioItemDocument = PortfolioItem & Document;

@Schema({ timestamps: true })
export class PortfolioItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  projectUrl?: string;

  @Prop([String])
  tags: string[];
}

export const PortfolioItemSchema = SchemaFactory.createForClass(PortfolioItem);
