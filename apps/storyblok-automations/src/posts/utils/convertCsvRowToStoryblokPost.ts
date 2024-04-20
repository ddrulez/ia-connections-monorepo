import { CreateEventDto } from '../dto/create-post.dto';
import { CsvRowDto } from '../dto/csv-post.dto';

export const convertCsvRowToStoryblokPost = (row: CsvRowDto): CreateEventDto => {
  return {
    title: row['Content Title'],
    description: row['Content Brief'],
    keyword: row.Keyword,
    keywords_secondary: row['Keywords Secondary'],
    keyword_difficulty: row['Keyword Difficulty'],
    slug: row.Slug,
    author: row.Author,
    ages: row.Ages,
    categories: row.Categories,
    image_alt: row['Image Alt'],
    image_title: row['Image Title'],
    article_type: row['Article Type'],
    publication_date: row['Publication Date'],
    meta_title: row['Brainstorm Meta Title'],
    meta_description: row['Brainstorm Meta Description'],
    body: row['Generate Blog Post'],
  };
};
