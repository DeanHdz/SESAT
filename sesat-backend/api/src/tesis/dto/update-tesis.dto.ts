import { PartialType } from "@nestjs/mapped-types";
import { CreateTesisDto } from "./create-tesis.dto";
import {
  IsBoolean,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class UpdateTesisDto extends PartialType(CreateTesisDto) {
  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsDateString()
  fecha_registro: Date;

  @IsOptional()
  @IsNumber()
  generacion: number;

  @IsOptional()
  @IsNumber()
  ultimo_avance: number;

  @IsNotEmpty()
  @IsBoolean()
  estado_finalizacion: boolean;
}
