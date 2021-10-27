import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from '../model/user.entity';
import { UserBody } from './user.request';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private serv: UserService) { }

  @Get()
  public async getAll(
    @Query('email') email: string,
    @Query('username') username: string,
  ): Promise<User[] | User> {

    if(email){
      return await this.serv.getByEmail(email)
    }
    if(username){
      return await this.serv.getByUsername(username)
    }
    
    return await this.serv.getAllUsers()
  }

  @Get(':userID')
  public async getOneUser(@Param('userID') userID: number): Promise<User> {
    return await this.serv.getUserById(userID)
  }

  @Post()
  public async addUser(
    @Body() UserBody: UserBody,
  ){
    return await this.serv.addUser(UserBody)
  }

  @Put(':userID')
  public async putUser(
    @Param('userID') userID: number,
    @Body() UserBody: UserBody,
  ){
    return await this.serv.putUser(userID, UserBody)
  }

  @Delete(':userID')
  public async deleteUser(
    @Param('userID') userID: number,
  ){
    let user: User = await this.serv.deleteUser(userID)
    if(user){
      return {user, "message": "Deleted successfully"}
    }
  }
}
