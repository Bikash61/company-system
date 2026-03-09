import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.blogService.create(createPostDto, req.user);
  }

  @Put(':slug')
  @UseGuards(AuthGuard())
  update(@Param('slug') slug: string, @Body() createPostDto: CreatePostDto) {
    return this.blogService.update(slug, createPostDto);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard())
  delete(@Param('slug') slug: string) {
    return this.blogService.delete(slug);
  }
}
