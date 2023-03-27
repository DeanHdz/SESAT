import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAsesorExternoDto {
  @IsNotEmpty()
  @IsNumber()
  Clave: number;

  @IsNotEmpty()
  @IsString()
  Telefono: string;

  @IsNotEmpty()
  @IsString()
  Institucion: string;

  @IsNotEmpty()
  @IsString()
  Nombre: string;

  @IsNotEmpty()
  @IsString()
  ApellidoPaterno: string;

  @IsNotEmpty()
  @IsString()
  ApellidoMaterno: string;

  @IsNotEmpty()
  @IsString()
  Correo: string;
}
