import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
