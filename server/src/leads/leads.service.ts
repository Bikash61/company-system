import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeadDto } from './dto/create-lead.dto';
import { Lead, LeadDocument, LeadStatus } from './schemas/lead.schema';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<LeadDocument>) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const createdLead = new this.leadModel(createLeadDto);
    return createdLead.save();
  }

  async findAll(): Promise<Lead[]> {
    return this.leadModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Lead> {
    return this.leadModel.findById(id).exec();
  }

  async updateStatus(id: string, status: LeadStatus): Promise<Lead> {
    return this.leadModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.leadModel.findByIdAndDelete(id).exec();
  }
}
