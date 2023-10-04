import { PartialType } from "@nestjs/mapped-types";
import { CreateAsignacionDto } from "./create-asignacion.dto";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateAsignacionDto extends PartialType(CreateAsignacionDto) {
  @IsNotEmpty()
  @IsNumber()
  id_asignacion: number;

  @IsOptional()
  @IsNumber()
  id_formato_evaluacion: number;

  @IsOptional()
  @IsNumber()
  id_acta_evaluacion: number;

  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;

  @IsNotEmpty()
  @IsNumber()
  id_modalidad: number;

  @IsNotEmpty()
  @IsNumber()
  id_periodo: number;

  @IsNotEmpty()
  @IsNumber()
  num_avance: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_entrega: Date;

  @IsOptional()
  @IsNumber()
  calificacion: number;

  @IsOptional()
  @IsString()
  documento: string;

  @IsNotEmpty()
  @IsNumber()
  estado_entrega: number;

  @IsOptional()
  @IsString()
  retroalimentacion: string;

  @IsNotEmpty()
  @IsNumber()
  tipo: number;
}
