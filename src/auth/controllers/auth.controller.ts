import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'Sign up completed successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'User email already exists.' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }
}
