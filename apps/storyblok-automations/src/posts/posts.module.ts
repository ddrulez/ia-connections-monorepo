import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { StoryblokService } from '../storyblok/storyblok.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, StoryblokService],
})
export class PostModule {}
