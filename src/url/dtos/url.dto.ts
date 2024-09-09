import { IsNotEmpty, IsString } from 'class-validator';

export class ShortenURLDto {
  @IsString()
  @IsNotEmpty()
  longUrl: string;
}
