import {IsBoolean, IsDateString} from "class-validator";

export class ClockDTO {
  @IsBoolean()
  public status: boolean;

  @IsDateString()
  public time: Date;
}