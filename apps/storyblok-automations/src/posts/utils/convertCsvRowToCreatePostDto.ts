import { CreateEventDto } from '../dto/create-post.dto';
import { CsvRowDto } from '../dto/csv-post.dto';

export const convertCsvRowToCreatePostDto = (row: CsvRowDto): CreateEventDto => {
  return {
    title: row.content_title,
    description: row.content_brief,
    keyword: row.keyword,
    keywords_secondary: row.keywords_secondary,
    keyword_difficulty: row.keyword_difficulty,
    slug: row.slug,
    author: row.author,
    categories: row.categories,
    categories_2: row.categories_2,
    image_alt: row.image_alt,
    image_title: row.image_title,
    article_type: row.article_type,
    publication_date: row.publication_date,
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    body: row.body,
    social_post: row.social_post,
  };
};
