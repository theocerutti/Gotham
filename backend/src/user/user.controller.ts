import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException} from '@nestjs/common';
import {User} from '../model/user.entity';
import {UserDTO} from './user.dto';
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

  @Get(':userId')
  public async getUser(
    @CurrentUser() currentUser: User,
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<User> {
    // TODO: manager can get general manager user?
    // can a manager get a user that is not in its team
    const user = await this.userService.getById(userId);
    if (currentUser.id === user.id)
      return user;
    if (user.role === Role.User)
      throw new UnauthorizedException();
    return user;
  }

  @Delete(':userId')
  @Roles(Role.GeneralManager)
  public async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return await this.userService.delete(userId);
  }
}
