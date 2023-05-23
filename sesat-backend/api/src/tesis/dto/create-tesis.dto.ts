import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTesisDto {
  @IsNotEmpty()
  @IsNumber()
  clave_alumno: number;

  @IsNotEmpty()
  @IsNumber()
  clave_asesor: number;

  @IsNotEmpty()
  @IsNumber()
  id_programa: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsDateString()
  fecharegistro: Date;
  
  @IsNotEmpty()
  @IsString()
  generacion: string;

  @IsNotEmpty()
  @IsString()
  modalidad: string;

  @IsNotEmpty()
  @IsNumber()
  ultimo_avance: number;

}