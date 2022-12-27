import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async doesUserExists(id: string): Promise<User> {
    const post = await this.userRepository.findOne({
      where: { id },
    });

    if (!post) throw new NotFoundException('The post does not exist');
    else return post;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.doesUserExists(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.doesUserExists(id);
    return await this.userRepository.save({ id: id, ...updateUserDto });
  }

  async remove(id: string): Promise<DeleteResult> {
    this.doesUserExists(id);
    return await this.userRepository.delete(id);
  }
}
