import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDatosAlumnoDto } from "./create-datos-alumno.dto";

export class UpdateDatosAlumnoDto extends PartialType(CreateDatosAlumnoDto) {
  @IsNotEmpty()
  @IsNumber()
  id_datos_alumno: number;

  @IsNotEmpty()
  @IsString()
  id_modalidad: number;

  @IsNotEmpty()
  @IsNumber()
  id_programa: number;

  @IsNotEmpty()
  @IsNumber()
  id_grado_estudio: number;

  @IsNotEmpty()
  @IsString()
  generacion: string;

  @IsNotEmpty()
  @IsBoolean()
  estado_activo: boolean;
}
