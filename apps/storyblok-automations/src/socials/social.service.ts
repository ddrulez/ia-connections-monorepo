import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';

@Injectable()
export class SocialService {
  private readonly logger = new Logger(SocialService.name);

  constructor() {}

  async addPostToAllSocialsNetwork(socialPost: CreateSocialDto): Promise<boolean> {
    try {
      this.logger.log('Adding post to all social networks', socialPost);
      await this.addPostToTwitter();
      await this.addPostToFacebook();
      await this.addPostToInstagram();
      await this.addPostToTiktok();
      return true;
    } catch (error) {
      this.logger.error('Error adding story to Storyblok:', error);
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error.message,
          response: error.response,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addPostToTwitter(): Promise<boolean> {
    try {
      return true;
    } catch (error) {}
  }

  async addPostToFacebook(): Promise<boolean> {
    try {
      return true;
    } catch (error) {}
  }

  async addPostToInstagram(): Promise<boolean> {
    try {
      return true;
    } catch (error) {}
  }

  async addPostToTiktok(): Promise<boolean> {
    try {
      return true;
    } catch (error) {}
  }
}
