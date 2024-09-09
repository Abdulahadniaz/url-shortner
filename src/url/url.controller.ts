import { Controller, Body, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './dtos/url.dto';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('shorten')
  shortenUrl(
    @Body()
    url: ShortenURLDto,
  ) {
    return this.urlService.shortenUrl(url);
  }

  @Get(':code')
  async redirect(
    @Res() res,
    @Param('code')
    code: string,
  ) {
    const url = await this.urlService.redirect(code);
    return res.redirect(url.longUrl);
  }
}
