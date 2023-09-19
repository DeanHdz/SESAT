import { IsBoolean, IsOptional, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTesisDto {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsDateString()
  fecha_registro: Date;
  
  @IsOptional()
  @IsNumber()
  generacion: number;

  @IsNotEmpty()
  @IsBoolean()
  registrada: boolean;

  @IsOptional()
  @IsNumber()
  ultimo_avance: number;

  @IsNotEmpty()
  @IsBoolean()
  estado_activo: boolean;

  @IsNotEmpty()
  @IsBoolean()
  estado_finalizacion: boolean;
}