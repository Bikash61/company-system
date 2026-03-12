import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { ProcessTextDto, ChatMessageDto } from './dto/process-text.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('process')
  processText(@Body() processTextDto: ProcessTextDto) {
    return this.aiService.processText(processTextDto);
  }

  // Public endpoint — no auth guard; used by the website chatbot
  @Post('chat')
  chat(@Body() chatMessageDto: ChatMessageDto) {
    return this.aiService.chat(chatMessageDto);
  }
}
