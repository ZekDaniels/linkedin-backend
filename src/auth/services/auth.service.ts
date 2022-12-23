import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
@Injectable()
export class AuthService {
  // registerAccount(createUserDto: CreateUserDto): Promise<User> {}
}
