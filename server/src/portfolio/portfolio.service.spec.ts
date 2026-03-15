import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { getModelToken } from '@nestjs/mongoose';
import { PortfolioItem } from './schemas/portfolio-item.schema';
import { Model } from 'mongoose';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let model: Model<PortfolioItem>;

  const mockPortfolioItem = {
    _id: 'some-id',
    title: 'Test Project',
    description: 'Test Description',
    imageUrl: 'http://example.com/image.png',
    category: 'Web Development',
  };

  const findChainMock = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([mockPortfolioItem]),
  };

  const countMock = {
    exec: jest.fn().mockResolvedValue(1),
  };

  const mockPortfolioModel = {
    create: jest.fn().mockResolvedValue(mockPortfolioItem),
    find: jest.fn().mockReturnValue(findChainMock),
    findById: jest.fn(() => ({
      exec: jest.fn().mockResolvedValue(mockPortfolioItem),
    })),
    findByIdAndUpdate: jest.fn(() => ({
      exec: jest.fn().mockResolvedValue(mockPortfolioItem),
    })),
    findByIdAndDelete: jest.fn(() => ({
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    })),
    countDocuments: jest.fn().mockReturnValue(countMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getModelToken(PortfolioItem.name),
          useValue: mockPortfolioModel,
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    model = module.get<Model<PortfolioItem>>(getModelToken(PortfolioItem.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new portfolio item', async () => {
      const createDto: CreatePortfolioItemDto = {
        title: 'Test Project',
        description: 'Test Description',
        imageUrl: 'http://example.com/image.png',
        category: 'Web Development',
      };
      const result = await service.create(createDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockPortfolioItem);
    });
  });

  describe('findAll', () => {
    it('should return an array of portfolio items', async () => {
      const result = await service.findAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.find).toHaveBeenCalled();
      expect(result.data).toEqual([mockPortfolioItem]);
      expect(result.total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a single portfolio item', async () => {
      const result = await service.findOne('some-id');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findById).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockPortfolioItem);
    });
  });

  describe('update', () => {
    it('should update a portfolio item', async () => {
      const updateDto: CreatePortfolioItemDto = {
        title: 'Updated Project',
        description: 'Updated Description',
        imageUrl: 'http://example.com/image.png',
        category: 'Web Development',
      };
      const updatedItem = { ...mockPortfolioItem, ...updateDto };
      (model.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(updatedItem),
      });

      const result = await service.update('some-id', updateDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'some-id',
        updateDto,
        { new: true },
      );
      expect(result).toEqual(updatedItem);
    });
  });

  describe('remove', () => {
    it('should delete a portfolio item', async () => {
      const result = await service.remove('some-id');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('some-id');
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
