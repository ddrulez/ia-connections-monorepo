import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-post.dto';
import { StoryblokService } from '../storyblok/storyblok.service';
import { StoryblokPost } from '../storyblok/storyblok.post.entity';
import { csvToJson } from 'src/_utils/csv';
import { CsvRowDto } from './dto/csv-post.dto';
import { convertCsvRowToStoryblokPost } from './utils/convertCsvRowToStoryblokPost';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly storyblokService: StoryblokService) {}

  async addNewPostToStoryblok(input: CreateEventDto): Promise<boolean> {
    try {
      const storyblokPost = new StoryblokPost(input);
      const publishStatus = await this.storyblokService.addStory(storyblokPost);
      return publishStatus;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async addNewPostToStoryblokWithCsv(fileCsv: Express.Multer.File): Promise<any> {
    const jsonResponse = {};
    let rowNumber = 0;

    try {
      const jsonCsv = await csvToJson<CsvRowDto>(fileCsv);

      for (const row of jsonCsv) {
        try {
          rowNumber++;
          console.log('Inizio elaborazione di row:', rowNumber);
          console.log('Inizio elaborazione di row:', jsonCsv);
          const storyblokPost = new StoryblokPost(convertCsvRowToStoryblokPost(row));
          await this.storyblokService.addStory(storyblokPost);
          jsonResponse[rowNumber] = 'OK';
        } catch (error) {
          console.error('ERROR IN ROW:', rowNumber, error);
          jsonResponse[rowNumber] =
            error.response.response?.[0] || error.response.error || error.response;
        }
      }
      const totalRowsProcessed = Object.keys(jsonResponse).length;
      const totalError = Object.values(jsonResponse).filter((v) => v !== 'OK').length;
      const totalErrorsExcludingAlreadyTaken =
        totalError -
        Object.values(jsonResponse).filter((v: string) => v.includes('already taken')).length;

      // console.log('TOTAL INPUT ROW:', jsonCsv.length);
      // console.log('TOTAL ROW PROCESSED:', jsonCsv.length);
      // console.log('TOTAL ERROR:', totalError);
      // console.log('TOTAL ERROR EXCLUDING already taken:', totalErrorsExcludingAlreadyTaken);

      jsonResponse['extra'] = {
        totalRowsInInput: jsonCsv.length,
        totalRowsProcessed: totalRowsProcessed,
        totalErrors: totalError,
        totalErrorsExcludingAlreadyTaken: totalErrorsExcludingAlreadyTaken,
      };
    } catch (error) {
      console.error('ERROR:', error);
      throw new HttpException(error.response, error.status);
    } finally {
      return jsonResponse;
    }
  }
}
