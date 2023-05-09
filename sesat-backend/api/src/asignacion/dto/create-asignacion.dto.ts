import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAsignacionDto {
  @IsNotEmpty()
  @IsNumber()
  asesor_externo_id: number;

  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;

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
}