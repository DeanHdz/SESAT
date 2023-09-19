import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDatosAlumnoDto } from "./create-datos-alumno.dto";

export class UpdateDatosAlumnoDto extends PartialType(CreateDatosAlumnoDto) {
  @IsNotEmpty()
  @IsNumber()
  id_datos_alumno: number;

  @IsNotEmpty()
  @IsNumber()
  id_grado_estudio: number;

  @IsNotEmpty()
  @IsNumber()
  id_modalidad: number;

  @IsNotEmpty()
  @IsBoolean()
  estado_activo: boolean;

  @IsNotEmpty()
  @IsNumber()
  id_programa: number;

  @IsNotEmpty()
  @IsNumber()
  generacion: number;
}
