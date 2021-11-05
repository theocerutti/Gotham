import {IsNumber, IsString} from "class-validator";

export class CreateTeamDTO {
  @IsNumber({}, {each: true})
  public userIds: number[];

  @IsString()
  public name: string;
}