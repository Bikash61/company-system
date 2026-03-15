import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { getModelToken } from '@nestjs/mongoose';
import { Lead, LeadStatus } from './schemas/lead.schema';
import { Model } from 'mongoose';
import { CreateLeadDto } from './dto/create-lead.dto';
import { MailService } from '../mail/mail.service';

describe('LeadsService', () => {
  let service: LeadsService;
  let model: Model<Lead>;

  const mockLead = {
    _id: 'some-id',
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message',
    status: LeadStatus.NEW,
  };

  const mockLeadModel = {
    create: jest.fn().mockResolvedValue(mockLead),
    find: jest.fn(() => ({
      sort: jest.fn(() => ({ exec: jest.fn().mockResolvedValue([mockLead]) })),
    })),
    findById: jest.fn(() => ({ exec: jest.fn().mockResolvedValue(mockLead) })),
    findByIdAndUpdate: jest.fn(() => ({
      exec: jest.fn().mockResolvedValue(mockLead),
    })),
    findByIdAndDelete: jest.fn(() => ({
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getModelToken(Lead.name),
          useValue: mockLeadModel,
        },
        {
          provide: MailService,
          useValue: {
            sendLeadNotification: jest.fn().mockResolvedValue(undefined),
            sendLeadWelcome: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    model = module.get<Model<Lead>>(getModelToken(Lead.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new lead', async () => {
      const createDto: CreateLeadDto = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      };
      const result = await service.create(createDto);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockLead);
    });
  });

  describe('findAll', () => {
    it('should return an array of leads', async () => {
      const result = await service.findAll();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockLead]);
    });
  });

  describe('findOne', () => {
    it('should return a single lead', async () => {
      const result = await service.findOne('some-id');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findById).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockLead);
    });
  });

  describe('updateStatus', () => {
    it('should update a lead status', async () => {
      const updatedLead = { ...mockLead, status: LeadStatus.CONTACTED };
      (model.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(updatedLead),
      });

      const result = await service.updateStatus(
        'some-id',
        LeadStatus.CONTACTED,
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'some-id',
        { status: LeadStatus.CONTACTED },
        { new: true },
      );
      expect(result).toEqual(updatedLead);
    });
  });

  describe('remove', () => {
    it('should delete a lead', async () => {
      const result = await service.remove('some-id');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('some-id');
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
