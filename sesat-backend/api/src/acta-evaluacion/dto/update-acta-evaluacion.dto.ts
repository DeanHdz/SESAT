import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateActaEvaluacionDto } from "./create-acta-evaluacion.dto";

export class UpdateActaEvaluacionDto extends PartialType(
  CreateActaEvaluacionDto
) {
  @IsNotEmpty()
  @IsNumber()
  id_acta: number;

  @IsOptional()
  documento_rellenado: string;

  @IsNotEmpty()
  @IsNumber()
  id_acta_vacia: number;
}
