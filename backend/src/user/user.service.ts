import { User } from '../model/user.entity';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly UserRepo: Repository<User>

  async getAllUsers(): Promise<User[]> {
    return await this.UserRepo.find();
  }

  async getById(id: number): Promise<User> {
    try {
      return await this.UserRepo.findOneOrFail(id);
    } catch (error) {
      throw new HttpException(`User not found: ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }
}
