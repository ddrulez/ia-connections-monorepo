import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateEventDto } from '../posts/dto/create-post.dto';
import { CONTENT_AUTHOR } from './constants/authors';
import { CONTENT_TOYS_CATEGORIES } from './constants/toys-categories';
import { CONTENT_AGES } from './constants/ages';
import { htmlToJson } from './utils/htmlToStoryblokJson';
import { removeLinksWithinParentheses } from './utils/sanitizeHtml';

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
  keyword_primary: string;
  keywords_secondary: string;
  keyword_difficulty: string;
  social_post_full: any;
  social_post: string;
  social_hastags: string;
};

export class StoryblokPost {
  name: string;
  slug: string;
  is_folder: boolean = false;
  is_startpage: boolean = false;
  content: Content;
  path?: string = null;

  parent_id: string = process.env.STORYBLOK_PARENT_ID_TOYS_FOLDER;

  constructor(readonly input: CreateEventDto) {
    try {
      const socialPostArray = input.social_post.split('#');
      const socialPost = socialPostArray[0];
      const socialHastags = socialPostArray
        .slice(1, socialPost.length)
        .map((ele) => `#${ele}`)
        .join(' ');

      this.name = input.title;
      this.slug = input.slug;

      this.content = {
        component: POST_COMPONENT,
        title: input.title,
        author: this.getAuthorIdFromName(input.author),
        ages: this.getAgeIdFromNames(input.categories),
        categories: this.getCategoryIdFromNames(`${input.categories_2},${input.article_type}`),
        body: [
          {
            component: 'section',
            body: this.getSectionBodyFromText(input.body),
          },
        ],
        no_index: false,
        no_follow: false,

        meta_title: input.meta_title.replaceAll('*', '').replaceAll('"', ' '),
        meta_description: input.meta_description.replaceAll('*', '').replaceAll('"', ' '),
        //   estReadingTime: '8',
        main_image_alt: input.image_alt,
        main_image_title: input.image_title,
        keyword_primary: input.keyword,
        keywords_secondary: input.keywords_secondary,
        keyword_difficulty: input.keyword_difficulty,
        social_post: socialPost,
        social_hastags: socialHastags,
        social_post_full: this.getSocialPostFull({
          post: socialPost,
          hashtags: socialHastags,
          slug: this.slug,
        }),
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
    const author = CONTENT_AUTHOR.find(
      (author) => author.name.toLowerCase() === authorName.toLowerCase(),
    );
    if (!author) {
      throw new Error(`Author not found: ${authorName}`);
    }
    return author.uuid;
  }

  private getCategoryIdFromNames(categoriesStringNames: string): string[] {
    const categoriesNames = categoriesStringNames.replaceAll(', ', ',').split(',');
    const categoryIds = categoriesNames.map((categoryName) => {
      const category = CONTENT_TOYS_CATEGORIES.find(
        (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
      );
      if (!category) {
        console.log('categoriesNames', categoriesNames);
        console.log('Category', categoryName);
        throw new Error(`Category or article_type not found in categories: ${categoryName}`);
      }
      return category.uuid;
    });

    const uniqueCategoryIds = Array.from(new Set(categoryIds));
    return uniqueCategoryIds;
  }

  private getAgeIdFromNames(agesStringNames: string): string[] {
    const agesNames = agesStringNames.replaceAll(', ', ',').split(',');
    const ageIds = agesNames.map((ageName) => {
      const age = CONTENT_AGES.find((age) => age.name.toLowerCase() === ageName.toLowerCase());
      if (!age) {
        throw new Error(`Age not found: ${ageName}`);
      }
      return age.uuid;
    });
    return ageIds;
  }

  private getSectionBodyFromText(body) {
    const sanitizeBody = removeLinksWithinParentheses(body);
    return htmlToJson(sanitizeBody);
  }
  private getSocialPostFull({
    post = '',
    hashtags = '',
    slug = '',
  }: {
    post: string;
    hashtags: string;
    slug: string;
  }) {
    const socialPostFull = `<p>${post}</p>
    <p><a href="https://nowkiddy/toys/${slug}">https://nowkiddy/toys/${slug}</a></p>
    <p>${hashtags}</p>`;

    return htmlToJson(socialPostFull);
  }
}
