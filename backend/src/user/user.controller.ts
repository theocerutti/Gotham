import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {User} from '../model/user.entity';
import {UserBody} from './user.request';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  public async getAll(
    @Query('email') email: string,
    @Query('username') username: string,
  ): Promise<User[] | User> {
    if (email) {
      return await this.userService.getByEmail(email)
    }
    if (username) {
      return await this.userService.getByUsername(username)
    }
    return await this.userService.getAll()
  }

  @Get(':userID')
  public async getOne(@Param('userID', ParseIntPipe) userID: number): Promise<User> {
    return await this.userService.getById(userID)
  }

  @Post()
  public async create(
    @Body() UserBody: UserBody,
  ) {
    return await this.userService.create(UserBody)
  }

  @Put(':userID')
  public async update(
    @Param('userID', ParseIntPipe) userID: number,
    @Body() UserBody: UserBody,
  ) {
    return await this.userService.update(userID, UserBody)
  }

  @Delete(':userID')
  public async delete(
    @Param('userID', ParseIntPipe) userID: number,
  ) {
    const user: User = await this.userService.delete(userID)
    if (user) {
      return {user, "message": "Deleted successfully"}
    }
  }
}
