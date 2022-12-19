import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { IPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() ipost: IPost): Observable<IPost> {
    return this.feedService.create(ipost);
  }

  @Get()
  findAll(): Observable<IPost[]> {
    return this.feedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPost> {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ipost: IPost): Observable<IPost> {
    return this.feedService.update(+id, ipost);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<DeleteResult> {
    return this.feedService.remove(+id);
  }
}
