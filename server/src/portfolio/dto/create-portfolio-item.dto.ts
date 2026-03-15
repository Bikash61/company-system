// src/portfolio/dto/create-portfolio-item.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreatePortfolioItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsUrl()
  @IsOptional()
  projectUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
