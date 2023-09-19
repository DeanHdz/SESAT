import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateFormatoEvaluacionDto {
  @IsNotEmpty()
  @IsNumber()
  id_formato_vacio: number;

  @IsOptional()
  documento_rellenado: string;
}
