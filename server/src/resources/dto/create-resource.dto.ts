import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;

  @IsUrl()
  @IsOptional()
  coverImageUrl?: string;
}
