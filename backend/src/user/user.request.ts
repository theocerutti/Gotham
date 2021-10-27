import {
  IsEmail, IsNotEmpty,
} from 'class-validator';

export class UserBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;
}