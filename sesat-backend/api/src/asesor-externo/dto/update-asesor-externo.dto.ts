import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesorExternoDto } from './create-asesor-externo.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAsesorExternoDto extends PartialType(CreateAsesorExternoDto) {
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
