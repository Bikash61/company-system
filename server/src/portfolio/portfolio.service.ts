import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { PortfolioItem, PortfolioItemDocument } from './schemas/portfolio-item.schema';

@Injectable()
export class PortfolioService {
  constructor(@InjectModel(PortfolioItem.name) private portfolioItemModel: Model<PortfolioItemDocument>) {}

  async create(createPortfolioItemDto: CreatePortfolioItemDto): Promise<PortfolioItem> {
    const createdItem = new this.portfolioItemModel(createPortfolioItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<PortfolioItem[]> {
    return this.portfolioItemModel.find().exec();
  }

  async findOne(id: string): Promise<PortfolioItem> {
    return this.portfolioItemModel.findById(id).exec();
  }

  async update(id: string, updatePortfolioItemDto: CreatePortfolioItemDto): Promise<PortfolioItem> {
    return this.portfolioItemModel.findByIdAndUpdate(id, updatePortfolioItemDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.portfolioItemModel.findByIdAndDelete(id).exec();
  }
}
