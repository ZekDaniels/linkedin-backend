import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { User } from '../models/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async doesUserExists(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('The user does not exist');
    else return user;
  }

  async doesEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) throw new BadRequestException('The email already exist');
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.doesEmailUnique(createUserDto.email);
    return await this.userRepository.save(plainToClass(User, createUserDto));
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.doesUserExists(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.doesUserExists(id);
    await this.doesEmailUnique(updateUserDto.email);
    return await this.userRepository.save({ id: id, ...updateUserDto });
  }

  async remove(id: string): Promise<DeleteResult> {
    this.doesUserExists(id);
    return await this.userRepository.delete(id);
  }
}
