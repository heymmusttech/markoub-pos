import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserPayload } from '../interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get Users: Get all user accounts' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get User: Get the user account' })
  @Get("me")
  findMe(@CurrentUser() user: CurrentUserPayload) {
    return this.usersService.findMe(user.sub);
  }

  @ApiOperation({ summary: 'Create User: Create a new user account' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}