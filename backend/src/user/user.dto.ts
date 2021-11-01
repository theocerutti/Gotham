import {IsEmail, IsNotEmpty, IsString,} from "class-validator";

export class UserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}