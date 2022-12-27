import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PostEntity } from '../models/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { User } from 'src/auth/models/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async doesPostExists(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) throw new NotFoundException('The post does not exist');
    else return post;
  }

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const author = await this.userRepository.findOne({
      where: { id: createPostDto.authorId },
    });
    return await this.postRepository.save({ author: author, ...createPostDto });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async findSelected(take = 10, skip = 0): Promise<PostEntity[]> {
    return await this.postRepository
      .findAndCount({ take, skip })
      .then(([posts]) => {
        return <PostEntity[]>posts;
      });
  }

  async findOne(id: string): Promise<PostEntity> {
    return await this.doesPostExists(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    await this.doesPostExists(id);
    return await this.postRepository.save({
      id: id,
      ...updatePostDto,
    });
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.doesPostExists(id);
    return await this.postRepository.delete(id);
  }
}
