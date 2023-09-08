import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDatosAlumnoDto } from "./create-datos-alumno.dto";

export class UpdateDatosAlumnoDto extends PartialType(CreateDatosAlumnoDto) {
  @IsNotEmpty()
  @IsNumber()
  id_datos_alumno: number;

  @IsNotEmpty()
  @IsString()
  grado_estudio: string;

  @IsNotEmpty()
  @IsString()
  modalidad: string;

  @IsNotEmpty()
  @IsBoolean()
  estado_activo: boolean;

  @IsNotEmpty()
  @IsNumber()
  id_programa: number;

  @IsNotEmpty()
  @IsString()
  generacion: string;
}
