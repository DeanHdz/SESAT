import { PartialType } from "@nestjs/mapped-types";
import { CreatePeriodoDto } from "./create-periodo.dto";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
} from "class-validator";

export class UpdatePeriodoDto extends PartialType(CreatePeriodoDto) {
  @IsNotEmpty()
  @IsNumber()
  id_evento: number;

  @IsOptional()
  @IsDateString()
  fecha_apertura: Date;

  @IsOptional()
  @IsDateString()
  fecha_cierre: Date;
}
