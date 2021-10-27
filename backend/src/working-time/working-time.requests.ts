import {IsDate, IsOptional} from "class-validator";

export class WorkingTimeRequestQuery {
  @IsDate()
  @IsOptional()
  public start: Date;

  @IsDate()
  @IsOptional()
  public end: Date;
}

export class WorkingTimeDTO {
  @IsDate()
  public start: Date;

  @IsDate()
  public end: Date;
}