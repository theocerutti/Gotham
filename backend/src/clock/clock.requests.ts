import {IsDateString} from "class-validator";

export class ClockDTO {
  @IsDateString()
  public time: Date;
}