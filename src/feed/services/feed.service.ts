import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.save(createPostDto);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  findSelected(take = 10, skip = 0): Promise<PostEntity[]> {
    return this.postRepository.findAndCount({ take, skip }).then(([posts]) => {
      return <PostEntity[]>posts;
    });
  }

  findOne(id: string): Promise<PostEntity> {
    return this.postRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOne({
      where: { id },
    });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }
}
