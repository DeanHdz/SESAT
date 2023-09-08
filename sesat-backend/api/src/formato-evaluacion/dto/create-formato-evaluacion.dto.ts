import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateFormatoEvaluacionDto {
  @IsOptional()
  documento_rellenado: string;

  @IsNotEmpty()
  @IsNumber()
  id_formato_vacio: number;
}
