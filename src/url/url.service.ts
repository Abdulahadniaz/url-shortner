import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { Repository } from 'typeorm';
import { ShortenURLDto } from './dtos/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private repo: Repository<Url>,
  ) {}
  async shortenUrl(url: ShortenURLDto) {
    const { longUrl } = url;
    // check if valid url
    if (!isURL(longUrl)) {
      throw new BadRequestException('Come on! You need to give me a valid URL');
    }

    const urlCode = nanoid(10);
    const baseUrl = 'http://localhost:3000';

    try {
      // check if url has already been shortened, then return it
      let url = await this.repo.findOneBy({ longUrl });
      if (url) return url.shortUrl;

      // if no url is found, we need to shorten the given url
      const shortUrl = `${baseUrl}/${urlCode}`;
      url = this.repo.create({
        urlCode,
        longUrl,
        shortUrl,
      });

      this.repo.save(url);
      return url.shortUrl;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async redirect(urlCode: string) {
    try {
      const url = await this.repo.findOneBy({ urlCode });
      if (url) return url;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource not found');
    }
  }
}
