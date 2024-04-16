import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateEventDto } from '../posts/dto/create-post.dto';
import { CONTENT_AUTHOR } from './constants/authors';
import { CONTENT_TOYS_CATEGORIES } from './constants/toys-categories';
import { CONTENT_AGES } from './constants/ages';
import { htmlToJson } from './utils/htmlToJson';

const TOYS_FOLDER_ID = '477913259';
const POST_COMPONENT = 'postPage';

type Content = {
  component: string;
  title: string;
  author: string;
  ages: string[];
  categories: string[];
  body: any[];
  meta_title: string;
  main_image_alt: string;
  main_image_title: string;
  meta_description: string;
  no_index: boolean;
  no_follow: boolean;
};

export class StoryblokPost {
  name: string;
  slug: string;
  is_folder: boolean = false;
  is_startpage: boolean = false;
  content: Content;
  path?: string = null;

  parent_id: string = TOYS_FOLDER_ID;

  constructor(private input: CreateEventDto) {
    try {
      this.name = input.title;
      this.slug = input.slug;
      this.content = {
        component: POST_COMPONENT,
        title: input.title,
        author: this.getAuthorIdFromName(input.author),
        ages: this.getAgeIdFromNames(input.ages),
        body: [
          {
            component: 'section',
            body: this.getSectionBodyFromText(input.body),
          },
        ],
        no_index: false,
        no_follow: false,
        categories: this.getCategoryIdFromNames(input.categories),
        meta_title: input.meta_title,
        //   estReadingTime: '8',
        main_image_alt: input.image_alt,
        main_image_title: input.image_title,
        meta_description: input.meta_description,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error.message,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private getAuthorIdFromName(authorName: string): string {
    const author = CONTENT_AUTHOR.find((author) => author.name === authorName);
    if (!author) {
      throw new Error(`Author not found: ${authorName}`);
    }
    return author.uuid;
  }

  private getCategoryIdFromNames(categoriesNames: string[]): string[] {
    const categoryIds = categoriesNames.map((categoryName) => {
      const category = CONTENT_TOYS_CATEGORIES.find((category) => category.name === categoryName);
      if (!category) {
        throw new Error(`Category not found: ${categoryName}`);
      }
      return category.uuid;
    });
    return categoryIds;
  }

  private getAgeIdFromNames(agesNames: string[]): string[] {
    const ageIds = agesNames.map((ageName) => {
      const age = CONTENT_AGES.find((age) => age.name === ageName);
      if (!age) {
        throw new Error(`Age not found: ${ageName}`);
      }
      return age.uuid;
    });
    return ageIds;
  }

  private getSectionBodyFromText(body) {
    return htmlToJson(body);
  }
}
