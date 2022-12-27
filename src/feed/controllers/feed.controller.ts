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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.feedService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Retrieve all posts' })
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return await this.feedService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve paginated posts' })
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  @Get('select')
  async findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Promise<PostEntity[]> {
    take = take > 20 ? 20 : take;
    return await this.feedService.findSelected(take, skip);
  }

  @ApiOperation({ summary: 'Retrieve a post' })
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return await this.feedService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post' })
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post body already exists.' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return await this.feedService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.feedService.remove(id);
  }
}
