import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export type BlogPostDocument = BlogPost & Document;

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop()
  excerpt: string;

  @Prop()
  category: string;

  @Prop()
  imageUrl: string;

  @Prop({ default: 'Published' })
  status: string; // e.g., 'Draft', 'Published'

  @Prop([String])
  tags: string[];
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
