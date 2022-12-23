import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { DeleteResult } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.feedService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.feedService.findAll();
  }

  @Get('select')
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Promise<PostEntity[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findSelected(take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.feedService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.feedService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.feedService.remove(id);
  }
}
