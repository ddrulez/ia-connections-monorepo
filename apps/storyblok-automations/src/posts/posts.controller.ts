import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreateEventDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async addPost(@Body() input: CreateEventDto): Promise<boolean> {
    return this.postService.addNewPostToStoryblok(input);
  }

  @Post('/csv')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadCsvFile(@UploadedFile() file: Express.Multer.File, @Res() res): Promise<any> {
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).send('Nessun file fornito.');
    }

    const response = await this.postService.addNewPostToStoryblokWithCsv(file);
    return res.status(HttpStatus.CREATED).send(response);
  }
}
