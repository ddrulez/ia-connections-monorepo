import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import StoryblokClient from 'storyblok-js-client';
import { StoryblokPost } from './storyblok.post.entity';

@Injectable()
export class StoryblokService {
  private readonly client: StoryblokClient;
  private readonly logger = new Logger(StoryblokService.name);

  constructor() {
    this.client = new StoryblokClient({
      oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
    });
  }

  async addStory(storyblokPost: StoryblokPost): Promise<boolean> {
    try {
      const result = await this.client.post(`spaces/${process.env.STORYBLOK_SPACE_ID}/stories`, {
        story: storyblokPost,
      });

      this.logger.log('SUCCESS: adding story to Storyblok:', (result as any).status);
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
}
