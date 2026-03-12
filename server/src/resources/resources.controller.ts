import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { DownloadResourceDto } from './dto/download-resource.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  // Public — list all resources
  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  // Admin — create a resource
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  // Admin — delete a resource
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }

  // Public — submit gate form and receive download URL
  @Post(':id/download')
  download(
    @Param('id') id: string,
    @Body() downloadResourceDto: DownloadResourceDto,
  ) {
    return this.resourcesService.download(id, downloadResourceDto);
  }
}
