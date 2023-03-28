import { PartialType } from '@nestjs/mapped-types';
import { CreateTesisDto } from './create-tesis.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTesisDto extends PartialType(CreateTesisDto) {
  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;

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
  @IsDate()
  fecharegistro: Date;
  
  @IsNotEmpty()
  @IsString()
  generacion: string;

  @IsNotEmpty()
  @IsString()
  modalidad: string;
}
