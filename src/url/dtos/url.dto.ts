import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class ShortenURLDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl({}, { message: 'Invalid URL format' })
    longUrl: string
}
