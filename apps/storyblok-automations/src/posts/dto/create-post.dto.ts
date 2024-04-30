import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  keyword: string;

  @IsOptional()
  @IsString()
  keywords_secondary?: string;

  @IsOptional()
  @IsString()
  keyword_difficulty?: string;

  @IsString()
  slug: string;

  @IsString()
  author: string;

  @IsString()
  categories_2: string;

  @IsString()
  categories: string;

  @IsString()
  image_alt: string;

  @IsString()
  image_title: string;

  @IsString()
  article_type: string;

  @IsOptional()
  @IsDateString()
  publication_date?: string;

  @IsString()
  meta_title: string;

  @IsString()
  meta_description: string;

  @IsString()
  body: string;

  @IsString()
  social_post: string;
}
