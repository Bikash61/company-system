import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/auth/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostModel.find().populate('author', 'name').exec();
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostModel.findOne({ slug }).populate('author', 'name').exec();
    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<BlogPost> {
    const slug = this.createSlug(createPostDto.title);
    const newPost = new this.blogPostModel({
      ...createPostDto,
      slug,
      author: user,
    });
    return newPost.save();
  }

  async update(slug: string, updatePostDto: CreatePostDto): Promise<BlogPost> {
    const updatedPost = await this.blogPostModel.findOneAndUpdate({ slug }, updatePostDto, { new: true });
    if (!updatedPost) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }
    return updatedPost;
  }

  async delete(slug: string): Promise<void> {
    const result = await this.blogPostModel.deleteOne({ slug }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }
  }

  private createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove consecutive hyphens
  }
}
