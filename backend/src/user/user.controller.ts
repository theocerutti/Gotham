import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {User} from '../model/user.entity';
import {UserDTO} from './user.request';
import {UserService} from './user.service';
import {CurrentUser} from "../auth/current-user.decorator";
import {Roles} from "../role/roles.decorator";
import {Role} from "../role/role.utils";
import {ApiTags} from "@nestjs/swagger";

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  public async getMe(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Put()
  public async updateMe(
    @CurrentUser() user: User,
    @Body() userDTO: UserDTO,
  ): Promise<User> {
    return await this.userService.update(user.id, userDTO)
  }

  @Delete()
  public async deleteMe(
    @CurrentUser() user: User,
  ): Promise<User> {
    return await this.userService.delete(user.id)
  }

  @Post('promote/:userId')
  @Roles(Role.GeneralManager)
  public async promoteUser(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.promoteUser(userId);
  }

  @Delete(':userId')
  @Roles(Role.GeneralManager)
  public async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.delete(userId);
  }
}
