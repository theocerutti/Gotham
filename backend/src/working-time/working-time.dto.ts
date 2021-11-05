import {IsBoolean, IsDateString, IsOptional, IsString} from "class-validator";

export class WorkingTimeRequestQuery {
  @IsDateString()
  @IsOptional()
  public start: Date;

  @IsDateString()
  @IsOptional()
  public end: Date;

  @IsOptional()
  public hoursInWeek: Boolean;
}

export class WorkingTimeDTO {
  @IsDateString()
  public start: Date;

  @IsDateString()
  public end: Date;

  @IsString()
  @IsOptional()
  public description: string;

  @IsBoolean()
  @IsOptional()
  public billable: boolean;
}