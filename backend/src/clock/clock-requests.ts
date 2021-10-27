import {IsBoolean, IsDate} from "class-validator";

export class ClockDTO {
  @IsBoolean()
  public status: Boolean;

  @IsDate()
  public time: Date;
}