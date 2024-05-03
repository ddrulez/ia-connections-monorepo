export type BlogName = {
  nowkiddy: 'nowkiddy';
  eguadagnare: 'eguadagnare';
};

export type CsvRowDto = {
  content_title: string;
  content_brief: string;
  keyword: string;
  keywords_secondary: string;
  keyword_difficulty: string;
  slug: string;
  author: string;
  categories: string;
  categories_2: string;
  image_alt: string;
  image_title: string;
  article_type: string;
  publication_date: string;
  meta_title: string;
  meta_description: string;
  body: string;
  social_post: string;
  blog_name: BlogName;
  estimate_reading_time: string;
};
