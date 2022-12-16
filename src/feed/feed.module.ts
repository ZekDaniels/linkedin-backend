import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controllers/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
