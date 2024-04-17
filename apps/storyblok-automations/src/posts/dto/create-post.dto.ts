import { IsDateString, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  keyword: string;

  @IsString()
  keywords_secondary: string;

  @IsString()
  keyword_difficulty: string;

  @IsString()
  slug: string;

  @IsString()
  author: string;

  @IsString()
  ages: string;

  @IsString()
  categories: string;

  @IsString()
  image_alt: string;

  @IsString()
  image_title: string;

  @IsString()
  article_type: string;

  @IsDateString()
  publication_date: string;

  @IsString()
  meta_title: string;

  @IsString()
  meta_description: string;

  @IsString()
  body: string;
}
