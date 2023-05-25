import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAsignacionDto {

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
  @IsDate()
  apertura: Date;

  @IsNotEmpty()
  @IsDate()
  cierre: Date;

  @IsNotEmpty()
  @IsNumber()
  calificacion: number;

  @IsNotEmpty()
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
  id_formato_de_evaluacion: number;

  @IsNotEmpty()
  @IsNumber()
  id_acta_de_evaluacion: number;
}