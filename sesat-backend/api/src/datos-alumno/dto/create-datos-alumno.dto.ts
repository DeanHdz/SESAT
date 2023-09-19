import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDatosAlumnoDto {
  @IsNotEmpty()
  @IsNumber()
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
