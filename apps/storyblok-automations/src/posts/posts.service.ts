import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-post.dto';
import { StoryblokService } from '../storyblok/storyblok.service';
import { StoryblokPost } from '../storyblok/storyblok.post.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly storyblokService: StoryblokService) {}

  async addNewPostToStoryblok(input: CreateEventDto): Promise<boolean> {
    try {
      const storyblokPost = new StoryblokPost(input);
      const publishStatus = await this.storyblokService.addStory(storyblokPost);
      return publishStatus;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
