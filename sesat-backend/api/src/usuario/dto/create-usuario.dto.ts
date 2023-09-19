import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { DatosAsesorexterno } from "src/datos-asesorexterno/entities/datos-asesorexterno.entity";

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsNumber()
  id_rol: number;

  @IsOptional()
  @IsNumber()
  id_datos_alumno: number;

  @IsOptional()
  @IsNumber()
  id_datos_asesor_externo: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido_paterno: string;

  @IsNotEmpty()
  @IsString()
  apellido_materno: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  correo: string;
}
