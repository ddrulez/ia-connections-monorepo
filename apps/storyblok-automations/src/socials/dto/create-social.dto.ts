import { IsString, IsUrl } from 'class-validator';

export class CreateSocialDto {
  @IsString()
  message: string;

  @IsString()
  hastags: string;

  @IsUrl()
  url: string;

  @IsUrl()
  image?: string;
}
