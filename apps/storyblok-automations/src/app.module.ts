import { Module } from '@nestjs/common';
import { PostModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { MainController } from './main.controller';
import { SocialModule } from './socials/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PostModule,
    SocialModule,
  ],
  controllers: [MainController],
  providers: [],
})
export class AppModule {}
