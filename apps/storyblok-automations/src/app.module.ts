import { Module } from '@nestjs/common';
import { PostModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { MainController } from './main.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PostModule,
  ],
  controllers: [MainController],
  providers: [],
})
export class AppModule {}
