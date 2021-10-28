import {IsEmail, IsNotEmpty, IsOptional, IsString,} from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;
}

export class QueryUserDTO {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string
}