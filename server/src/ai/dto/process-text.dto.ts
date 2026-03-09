// src/ai/dto/process-text.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class ProcessTextDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
