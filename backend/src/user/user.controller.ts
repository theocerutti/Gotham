import { Controller, Get } from '@nestjs/common';
import { User } from '../model/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private serv: UserService) { }

  @Get()
  public async getAll(): Promise<User[]> {
    return await this.serv.getAllUsers()
  }

  
}
