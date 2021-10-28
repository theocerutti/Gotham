import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {User} from '../model/user.entity';
import {QueryUserDTO, UserDTO} from './user.request';
import {UserService} from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  public async getAll(
    @Query() userDTO: QueryUserDTO
  ): Promise<User[] | User> {
    if (userDTO.email) {
      return await this.userService.getByEmail(userDTO.email)
    }
    if (userDTO.username) {
      return await this.userService.getByUsername(userDTO.username)
    }
    return await this.userService.getAll()
  }

  @Get(':userID')
  public async getOne(@Param('userID', ParseIntPipe) userID: number): Promise<User> {
    return await this.userService.getById(userID)
  }

  @Post()
  public async create(
    @Body() userDTO: UserDTO,
  ) {
    return await this.userService.create(userDTO)
  }

  @Put(':userID')
  public async update(
    @Param('userID', ParseIntPipe) userID: number,
    @Body() userDTO: UserDTO,
  ) {
    return await this.userService.update(userID, userDTO)
  }

  @Delete(':userID')
  public async delete(
    @Param('userID', ParseIntPipe) userID: number,
  ) {
    return await this.userService.delete(userID)
  }
}
