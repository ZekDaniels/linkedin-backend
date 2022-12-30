import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(signUpDto);

    return user;
  }
}
