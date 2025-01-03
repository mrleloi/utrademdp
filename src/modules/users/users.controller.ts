import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { CreateUserDto } from './dtos/request.dto';
import { User } from './entities/users.entity';

@ApiTags(AppRoutes.users.tag)
@Controller({ path: AppRoutes.users.tag })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getAllUser(@Param('id') id: string) {
    const users = await this.usersService.findById(id);
    return users;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const response = await this.usersService.createUser(createUserDto);
    return response;
  }
}
