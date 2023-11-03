import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateAsignacionDto {
  @IsOptional()
  @IsNumber()
  id_formato_evaluacion: number;

  @IsOptional()
  @IsNumber()
  id_acta_evaluacion: number;

  @IsOptional()
  @IsNumber()
  id_tesis: number;

  @IsOptional()
  @IsNumber()
  id_modalidad: number;

  @IsOptional()
  @IsNumber()
  id_periodo: number;

  @IsOptional()
  @IsNumber()
  num_avance: number;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsDateString()
  fecha_entrega: Date;

  @IsOptional()
  @IsNumber()
  calificacion: number;

  @IsOptional()
  //@IsString()
  documento: Buffer;

  @IsNotEmpty()
  @IsNumber()
  estado_entrega: number;

  @IsOptional()
  @IsString()
  retroalimentacion: string;

  @IsNotEmpty()
  @IsNumber()
  tipo: number;

  @IsOptional()
  @IsDateString()
  fecha_presentacion: Date;
}
