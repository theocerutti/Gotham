import { User } from '../model/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly UserRepo: Repository<User>

  async getAllUsers(): Promise<User[]> {
    return await this.UserRepo.find();
  }

}
