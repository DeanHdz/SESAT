import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateForeignAsesorDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido_paterno: string;

  @IsOptional()
  @IsString()
  apellido_materno: string;

  @IsNotEmpty()
  @IsNumber()
  telefono: number;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsString()
  organizacion: string; 
}