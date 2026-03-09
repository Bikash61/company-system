import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProcessTextDto } from './dto/process-text.dto';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async processText(processTextDto: ProcessTextDto) {
    const aiServiceUrl = 'http://127.0.0.1:8000/process-text';
    try {
      const response = await firstValueFrom(
        this.httpService.post(aiServiceUrl, processTextDto),
      );
      return response.data;
    } catch (error) {
      console.error('Error contacting AI service:', error);
      throw new Error('Failed to process text with AI service.');
    }
  }
}
