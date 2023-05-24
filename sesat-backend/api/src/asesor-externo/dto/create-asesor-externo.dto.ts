import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAsesorExternoDto {
  @IsNotEmpty()
  @IsNumber()
  id_asesor_externo: number;
  
  @IsNotEmpty()
  @IsNumber()
  clave: number;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  institucion: string;

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
  correo: string;
}
