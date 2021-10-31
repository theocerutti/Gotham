import {IsDateString, IsOptional, IsString} from "class-validator";

export class WorkingTimeRequestQuery {
  @IsDateString()
  @IsOptional()
  public start: Date;

  @IsDateString()
  @IsOptional()
  public end: Date;
}

export class WorkingTimeDTO {
  @IsDateString()
  public start: Date;

  @IsDateString()
  public end: Date;

  @IsString()
  @IsOptional()
  public description: string;
}