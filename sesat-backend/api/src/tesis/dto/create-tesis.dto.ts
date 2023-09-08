import { IsBoolean, IsOptional, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTesisDto {
  @IsNotEmpty()
  @IsNumber()
  clave_alumno: number;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsDateString()
  fecharegistro: Date;
  
  @IsOptional()
  @IsString()
  generacion: string;

  @IsNotEmpty()
  @IsBoolean()
  registrada: boolean;

  @IsOptional()
  @IsNumber()
  ultimo_avance: number;

  @IsNotEmpty()
  @IsBoolean()
  estado_activo: boolean;
}