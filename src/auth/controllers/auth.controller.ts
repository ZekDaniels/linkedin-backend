import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.authService.registerAccount(createUserDto);
  // }
}
