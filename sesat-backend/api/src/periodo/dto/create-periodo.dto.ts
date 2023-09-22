import { IsOptional, IsDateString } from "class-validator";

export class CreatePeriodoDto {
  @IsOptional()
  @IsDateString()
  fecha_apertura: Date;

  @IsOptional()
  @IsDateString()
  fecha_cierre: Date;
}
