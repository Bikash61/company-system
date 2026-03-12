import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getModelToken } from '@nestjs/mongoose';
import { BlogPost } from './schemas/blog-post.schema';
import { Model } from 'mongoose';

describe('BlogService', () => {
  let blogService: BlogService;
  let blogPostModel: Model<BlogPost>;

  const mockBlogPostModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    findOneAndUpdate: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    populate: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(BlogPost.name),
          useValue: mockBlogPostModel,
        },
      ],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
    blogPostModel = module.get<Model<BlogPost>>(getModelToken(BlogPost.name));
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new blog post', async () => {
      const createPostDto = { title: 'Test Post', content: 'Test Content' };
      const author = { _id: 'authorId' } as any;
      
      mockBlogPostModel.create.mockResolvedValue({
        ...createPostDto,
        author,
        slug: 'test-post',
      } as any);

      const result = await blogService.create(createPostDto, author);

      expect(result.title).toEqual(createPostDto.title);
      expect(result.slug).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of blog posts', async () => {
      const posts = [{ title: 'Test Post', content: 'Test Content' }];
      mockBlogPostModel.exec.mockResolvedValue(posts);

      const result = await blogService.findAll();

      expect(result).toEqual(posts);
    });
  });

  describe('findBySlug', () => {
    it('should return a single blog post', async () => {
      const post = { title: 'Test Post', content: 'Test Content' };
      mockBlogPostModel.exec.mockResolvedValue(post);

      const result = await blogService.findBySlug('test-post');

      expect(result).toEqual(post);
    });
  });

  describe('update', () => {
    it('should update a blog post', async () => {
      const updatePostDto = { title: 'Updated Post', content: 'Updated Content' };
      const slug = 'test-post';
      const updatedPost = { ...updatePostDto, slug };

      (blogPostModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedPost);

      const result = await blogService.update(slug, updatePostDto);

      expect(blogPostModel.findOneAndUpdate).toHaveBeenCalledWith({ slug }, updatePostDto, { new: true });
      expect(result.title).toEqual(updatePostDto.title);
    });
  });

  describe('delete', () => {
    it('should delete a blog post', async () => {
      const slug = 'test-post';
      
      (blogPostModel.deleteOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      await blogService.delete(slug);

      expect(blogPostModel.deleteOne).toHaveBeenCalledWith({ slug });
    });
  });
});
