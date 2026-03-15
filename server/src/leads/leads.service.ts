import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead, LeadDocument, LeadStatus } from './schemas/lead.schema';
import { MailService } from '../mail/mail.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private leadModel: Model<LeadDocument>,
    private readonly mailService: MailService,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = await this.leadModel.create(createLeadDto);
    // Fire-and-forget emails
    void this.mailService.sendLeadNotification(createLeadDto);
    void this.mailService.sendLeadWelcome({
      name: createLeadDto.name,
      email: createLeadDto.email,
    });
    return lead;
  }

  async findAll(): Promise<Lead[]> {
    return this.leadModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Lead | null> {
    return this.leadModel.findById(id).exec();
  }

  async updateStatus(id: string, status: LeadStatus): Promise<Lead | null> {
    return this.leadModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Lead | null> {
    return this.leadModel.findByIdAndDelete(id).exec();
  }
}
