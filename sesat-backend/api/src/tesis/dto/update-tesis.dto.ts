import { PartialType } from '@nestjs/mapped-types';
import { CreateTesisDto } from './create-tesis.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTesisDto extends PartialType(CreateTesisDto) {
  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;

  @IsNotEmpty()
  @IsNumber()
  Clave_Alumno: number;

  @IsNotEmpty()
  @IsNumber()
  Clave_Asesor: number;

  @IsNotEmpty()
  @IsNumber()
  id_Programa: number;

  @IsNotEmpty()
  @IsString()
  Titulo: string;

  @IsNotEmpty()
  @IsDate()
  FechaRegistro: Date;
  
  @IsNotEmpty()
  @IsString()
  Generacion: string;

  @IsNotEmpty()
  @IsString()
  Modalidad: string;
}
