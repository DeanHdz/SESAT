import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDatosAlumnoDto 
{
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
