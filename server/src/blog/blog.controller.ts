import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.blogService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 6,
    );
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

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() createPostDto: CreatePostDto) {
    return this.blogService.updateById(id, createPostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string) {
    return this.blogService.deleteById(id);
  }
}
