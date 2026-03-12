import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { CreateResourceDto } from './dto/create-resource.dto';
import { DownloadResourceDto } from './dto/download-resource.dto';
import { LeadsService } from '../leads/leads.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
    private readonly leadsService: LeadsService,
    private readonly mailService: MailService,
  ) {}

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().sort({ createdAt: -1 }).exec();
  }

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    return this.resourceModel.create(createResourceDto);
  }

  async remove(id: string): Promise<any> {
    return this.resourceModel.findByIdAndDelete(id).exec();
  }

  async download(
    id: string,
    downloadResourceDto: DownloadResourceDto,
  ): Promise<{ fileUrl: string }> {
    const resource = await this.resourceModel.findById(id).exec();
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    // Capture the lead
    await this.leadsService.create({
      name: downloadResourceDto.name,
      email: downloadResourceDto.email,
      message: `Resource download: ${resource.title}`,
    });

    // Send download confirmation email
    this.mailService.sendResourceDownloadConfirmation({
      name: downloadResourceDto.name,
      email: downloadResourceDto.email,
      resourceTitle: resource.title,
      fileUrl: resource.fileUrl,
    });

    return { fileUrl: resource.fileUrl };
  }
}
