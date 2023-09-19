import { PartialType } from "@nestjs/mapped-types";
import { CreateFormatoEvaluacionDto } from "./create-formato-evaluacion.dto";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateFormatoEvaluacionDto extends PartialType(
  CreateFormatoEvaluacionDto
) {
  @IsNotEmpty()
  @IsNumber()
  id_formato_evaluacion: number;

  @IsNotEmpty()
  @IsNumber()
  id_formato_vacio: number;

  @IsOptional()
  documento_rellenado: string;
}
