import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { ProcessTextDto } from './dto/process-text.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('process')
  processText(@Body() processTextDto: ProcessTextDto) {
    return this.aiService.processText(processTextDto);
  }
}
