import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { PortfolioItem, PortfolioItemDocument } from './schemas/portfolio-item.schema';

@Injectable()
export class PortfolioService {
  constructor(@InjectModel(PortfolioItem.name) private portfolioItemModel: Model<PortfolioItemDocument>) {}

  async create(createPortfolioItemDto: CreatePortfolioItemDto): Promise<PortfolioItem> {
    return this.portfolioItemModel.create(createPortfolioItemDto);
  }

  async findAll(page = 1, limit = 6): Promise<{ data: PortfolioItem[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.portfolioItemModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.portfolioItemModel.countDocuments().exec(),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<PortfolioItem | null> {
    return this.portfolioItemModel.findById(id).exec();
  }

  async update(id: string, updatePortfolioItemDto: CreatePortfolioItemDto): Promise<PortfolioItem | null> {
    return this.portfolioItemModel.findByIdAndUpdate(id, updatePortfolioItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.portfolioItemModel.findByIdAndDelete(id).exec();
  }
}
