import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDatosAlumnoDto 
{
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
