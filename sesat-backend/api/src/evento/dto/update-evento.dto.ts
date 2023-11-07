import { PartialType } from "@nestjs/mapped-types";
import { CreateEventoDto } from "./create-evento.dto";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from "class-validator";

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
  @IsNotEmpty()
  @IsNumber()
  id_evento: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsNumber()
  id_creador: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;

  @IsOptional()
  @IsDateString()
  fecha_termino: Date;
}
