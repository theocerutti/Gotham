import {Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, UnauthorizedException} from "@nestjs/common";
import {User} from "../model/user.entity";
import {UserUpdateDTO} from "./user.dto";
import {UserService} from "./user.service";
import {CurrentUser} from "../auth/current-user.decorator";
import {Roles} from "../role/roles.decorator";
import {Role} from "../role/role.utils";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller("users")
@ApiTags("users")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {
  }

  @ApiOperation({summary: "Get me"})
  @Get()
  public async getMe(@CurrentUser() user: User): Promise<User> {
    this.logger.log("GetMe with userId=", user.id);
    return user;
  }

  @ApiOperation({summary: "Get all users"})
  @Roles(Role.GeneralManager, Role.Manager)
  @Get("all")
  public async getAll(): Promise<User[]> {
    this.logger.log("GetAll");
    return this.userService.getAll();
  }

  @ApiOperation({summary: "Update me"})
  @Put()
  public async updateMe(
    @CurrentUser() user: User,
    @Body() userDTO: UserUpdateDTO,
  ): Promise<User> {
    this.logger.log("Update me with userId=", user.id, ", DTO=", userDTO);
    return await this.userService.update(user.id, userDTO);
  }

  @ApiOperation({summary: "Delete me"})
  @Delete()
  public async deleteMe(
    @CurrentUser() user: User,
  ): Promise<User> {
    this.logger.log("Delete user with userId=", user.id);
    return await this.userService.delete(user.id);
  }

  @ApiOperation({summary: "Promote a user to manager (generalManager)"})
  @Post("promote/:userId")
  @Roles(Role.GeneralManager)
  public async promoteUser(@Param("userId", ParseIntPipe) userId: number): Promise<User> {
    this.logger.log("Promote user", userId);
    return await this.userService.promoteUser(userId);
  }

  @ApiOperation({summary: "Demote a manager to user (generalManager)"})
  @Post("demote/:userId")
  @Roles(Role.GeneralManager)
  public async demoteUser(@Param("userId", ParseIntPipe) userId: number): Promise<User> {
    this.logger.log("Demote user", userId);
    return await this.userService.demoteUser(userId);
  }

  @ApiOperation({summary: "Get a user by id (manager/generalManager)"})
  @Get(":userId")
  public async getUser(
    @CurrentUser() currentUser: User,
    @Param("userId", ParseIntPipe) userId: number
  ): Promise<User> {
    this.logger.log("Get user by id=", userId);
    // TODO: manager can get general manager user?
    // can a manager get a user that is not in its team
    if(currentUser.id === userId || currentUser.role === Role.Manager || currentUser.role === Role.GeneralManager){
      return await this.userService.getById(userId);
    }else {
      throw new UnauthorizedException();
    }
  }

  @ApiOperation({summary: "Delete a user by id (generalManager)"})
  @Delete(":userId")
  @Roles(Role.GeneralManager)
  public async deleteUser(@Param("userId", ParseIntPipe) userId: number): Promise<User> {
    this.logger.log("Delete user with id=", userId);
    return await this.userService.delete(userId);
  }
}
