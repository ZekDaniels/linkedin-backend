import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup user' })
  @ApiCreatedResponse({ description: 'Sign up completed successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'User email already exists.' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }
}
