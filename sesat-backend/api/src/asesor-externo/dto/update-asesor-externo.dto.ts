import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesorExternoDto } from './create-asesor-externo.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAsesorExternoDto extends PartialType(CreateAsesorExternoDto) {
  @IsNotEmpty()
  @IsNumber()
  asesor_externo_id: number;
  
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
  apellidopaterno: string;

  @IsNotEmpty()
  @IsString()
  apellidomaterno: string;

  @IsNotEmpty()
  @IsString()
  correo: string;
}
