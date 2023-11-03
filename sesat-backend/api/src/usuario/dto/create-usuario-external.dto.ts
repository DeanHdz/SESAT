import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateFromExternalDto {

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  dedicacion: string;

  @IsNotEmpty()
  @IsString()
  programa: string;

  @IsNotEmpty()
  @IsString()
  grado_estudio: string;

  @IsNotEmpty()
  @IsString()
  gen: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  skipToAvance: number;
}