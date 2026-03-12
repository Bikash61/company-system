// src/ai/dto/process-text.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class ProcessTextDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class ChatHistoryMessageDto {
  @IsString()
  role: string;

  @IsString()
  content: string;
}

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  history: ChatHistoryMessageDto[] = [];
}
