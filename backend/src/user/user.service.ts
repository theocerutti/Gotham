import {UserDTO} from './user.request';
import {User} from '../model/user.entity';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly UserRepo: UserRepository,
  ) {
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.UserRepo.find();
    } catch (error) {
      throw new HttpException(`Can't find all user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(userID: number): Promise<User> {
    try {
      return await this.UserRepo.findOneOrFail(userID);
    } catch (error) {
      throw new HttpException(`Could not find user: ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.UserRepo.findOneOrFail({where: {email: email}});
    } catch (error) {
      throw new HttpException(`Could not find user by email: ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }

  async getByUsername(username: string): Promise<User> {
    try {
      return await this.UserRepo.findOneOrFail({where: {username: username}});
    } catch (error) {
      throw new HttpException(`Could not find user by username ${error.message}`, HttpStatus.NOT_FOUND);
    }
  }

  async create(userDTO: UserDTO): Promise<User> {
    let user: User = new User();

    user.username = userDTO.username
    user.email = userDTO.email

    try {
      return await this.UserRepo.save(user)
    } catch (error) {
      throw new HttpException(`Could not create user : ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userID: number, userDTO: UserDTO): Promise<User> {
    let user: User = await this.getById(userID)

    if (userDTO.username) {
      user.username = userDTO.username
    }
    if (userDTO.email) {
      user.email = userDTO.email
    }

    try {
      return await this.UserRepo.save(user)
    } catch (error) {
      throw new HttpException(`Could not update user : ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(userID: number): Promise<User> {
    let user: User = await this.getById(userID)

    try {
      return await this.UserRepo.remove(user);
    } catch (error) {
      throw new HttpException(`Could not remove user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
