import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { Post } from '../models/post.entity';
import { IPost } from '../models/post.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  create(ipost: IPost): Observable<IPost> {
    return from(this.postRepository.save(ipost));
  }

  findAll(): Observable<IPost[]> {
    return from(this.postRepository.find());
  }

  findOne(id: number): Observable<IPost> {
    return from(
      this.postRepository.findOne({
        where: { id },
      }),
    );
  }

  update(id: number, ipost: IPost): Observable<IPost> {
    this.postRepository.update(id, ipost);
    return from(
      this.postRepository.findOne({
        where: { id },
      }),
    );
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.postRepository.delete(id));
  }
}
