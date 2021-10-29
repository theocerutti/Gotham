import {Body, Controller, Delete, Get, Put} from '@nestjs/common';
import {User} from '../model/user.entity';
import {UserDTO} from './user.request';
import {UserService} from './user.service';
import {CurrentUser} from "../auth/current-user.decorator";

@Controller('users')
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
}
