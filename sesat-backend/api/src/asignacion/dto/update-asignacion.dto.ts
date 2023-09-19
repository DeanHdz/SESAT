import { PartialType } from "@nestjs/mapped-types";
import { CreateAsignacionDto } from "./create-asignacion.dto";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAsignacionDto extends PartialType(CreateAsignacionDto) {
  @IsNotEmpty()
  @IsNumber()
  id_asignacion: number;

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
  fecha_apertura: Date;

  @IsNotEmpty()
  @IsDateString()
  fecha_cierre: Date;

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

  @IsOptional()
  @IsNumber()
  id_formato_de_evaluacion: number;

  @IsOptional()
  @IsNumber()
  id_acta_de_evaluacion: number;
}
