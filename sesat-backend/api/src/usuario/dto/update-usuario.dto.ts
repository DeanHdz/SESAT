import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
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

  @IsOptional()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  correo: string;
}
