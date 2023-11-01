import { PartialType } from "@nestjs/mapped-types";
import { CreateFormatoEvaluacionDto } from "./create-formato-evaluacion.dto";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFormatoEvaluacionDto extends PartialType(
  CreateFormatoEvaluacionDto
) {
  @IsNotEmpty()
  @IsNumber()
  id_formato_evaluacion: number;

  @IsNotEmpty()
  @IsNumber()
  id_formato_vacio: number;

  @IsNotEmpty()  
  documento_rellenado: Buffer;
}
