import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class MainController {
  @Get()
  getHello(): string {
    // console.log(input);
    return 'Hello World!';
  }
}
