import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreateEventDto } from './dto/create-post.dto';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async addNewPost(@Body() input: CreateEventDto): Promise<boolean> {
    // console.log(input);
    return await this.postService.addNewPostToStoryblok(input);
  }
}
