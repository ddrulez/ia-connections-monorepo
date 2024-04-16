import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../posts.controller';
import { PostService } from '../posts.service';

const body = {
  title: 'AAAAA',
  description: 'title must be a string',
  keyword: 'title must be a string',
  keywords_secondary: 'title must be a string',
  keyword_difficulty: 'title must be a string',
  slug: 'title must be a string',
  author: 'title must be a string',
  ages: 'title must be a string',
  categories: 'title must be a string',
  image_alt: 'title must be a string',
  image_title: 'title must be a string',
  article_typopogy: 'title must be a string',
  publication_date: '2024-04-03',
};

describe('Post Controller', () => {
  let postController: PostController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    postController = app.get<PostController>(PostController);
  });

  describe('POST /post', () => {
    it('given a valid body in input should be post a new storyblok content and return success ', () => {
      expect(postController.addNewPost(body)).toBe({ status: 'success' });
    });

    it('given an invalid body in input should return an error', () => {
      const body = {} as any; // Corpo vuoto che simula una richiesta non valida
      expect(postController.addNewPost(body)).toBe({ status: 'error' });
    });
  });
});
