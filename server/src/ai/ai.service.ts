import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProcessTextDto, ChatMessageDto } from './dto/process-text.dto';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async processText(processTextDto: ProcessTextDto) {
    const aiServiceUrl = 'http://127.0.0.1:8000/process-text';
    try {
      const response = await firstValueFrom(
        this.httpService.post(aiServiceUrl, processTextDto),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      console.error('Error contacting AI service:', error);
      throw new Error('Failed to process text with AI service.');
    }
  }

  async chat(chatMessageDto: ChatMessageDto) {
    const aiServiceUrl = 'http://127.0.0.1:8000/chat';
    try {
      const response = await firstValueFrom(
        this.httpService.post(aiServiceUrl, chatMessageDto),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      console.error('Error contacting AI chat service:', error);
      return {
        reply:
          "I'm having trouble connecting right now. Please visit our [contact page](/contact) to reach us directly.",
        action: 'contact',
      };
    }
  }
}
