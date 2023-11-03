import {
  IsBoolean,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

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

  @IsNotEmpty()
  @IsNumber()
  generacion: number;

  @IsNotEmpty()
  @IsNumber()
  ultimo_avance: number;

  @IsNotEmpty()
  @IsBoolean()
  estado_finalizacion: boolean;
}
