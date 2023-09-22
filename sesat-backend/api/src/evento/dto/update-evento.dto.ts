import { PartialType } from "@nestjs/mapped-types";
import { CreateEventoDto } from "./create-evento.dto";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  IsDateString,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
  @IsNotEmpty()
  @IsNumber()
  id_evento: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;

  @IsOptional()
  @IsDateString()
  fecha_termino: Date;
}
