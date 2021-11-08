import {UserDTO} from "./user.dto";
import {User} from "../model/user.entity";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {Role} from "../role/role.utils";

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

  async getByIds(userIds: number[]): Promise<User[]> {
    try {
      return await this.UserRepo.findByIds(userIds);
    } catch (error) {
      throw new HttpException(`Can't get users: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserTeamsIds(userId: number): Promise<number[]> {
    try {
      const user = await this.UserRepo.findOneOrFail(userId, {
        relations: ["teams"]
      });
      return user.teams.map(team => team.id);
    } catch (error) {
      throw new HttpException(`Can't get team ids: ${error.message}`, HttpStatus.NOT_FOUND);
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
    const user: User = new User();

    user.username = userDTO.username;
    user.email = userDTO.email;
    user.password = userDTO.password;

    try {
      return await this.UserRepo.save(user);
    } catch (error) {
      throw new HttpException(`Could not create user : ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userID: number, userDTO: UserDTO): Promise<User> {
    const user: User = await this.getById(userID);

    if (userDTO.username) {
      user.username = userDTO.username;
    }
    if (userDTO.email) {
      user.email = userDTO.email;
    }

    try {
      return await this.UserRepo.save(user);
    } catch (error) {
      throw new HttpException(`Could not update user : ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(userID: number): Promise<User> {
    const user: User = await this.getById(userID);

    try {
      return await this.UserRepo.remove(user);
    } catch (error) {
      throw new HttpException(`Could not remove user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async promoteUser(userId: number): Promise<User> {
    try {
      const user: User = await this.getById(userId);
      user.role = Role.Manager;
      console.log("user: ", user)
      return await this.UserRepo.save(user);
    } catch (error) {
      throw new HttpException(`Can't promote user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async demoteUser(userId: number): Promise<User> {
    try {
      const user: User = await this.getById(userId);
      user.role = Role.User;
      return await this.UserRepo.save(user);
    } catch (error) {
      throw new HttpException(`Can't demote user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
