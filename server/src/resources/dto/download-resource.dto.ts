import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class DownloadResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
