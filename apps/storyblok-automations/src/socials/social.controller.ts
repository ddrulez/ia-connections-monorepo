import { Body, Controller, Post } from '@nestjs/common';
import { SocialService } from './social.service';
import { CreateSocialDto } from './dto/create-social.dto';

@Controller('/socials')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  async addAllSocialPost(@Body() body: CreateSocialDto): Promise<boolean> {
    return this.socialService.addPostToAllSocialsNetwork(body);
  }
}
