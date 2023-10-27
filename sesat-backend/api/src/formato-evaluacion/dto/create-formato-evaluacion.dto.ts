import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFormatoEvaluacionDto {
  constructor(    
    document: Buffer,
    id_FormatoVacio: number
  ) {    
    this.id_formato_vacio = id_FormatoVacio;
    this.documento_rellenado = document;    
  }

  @IsNotEmpty()
  @IsNumber()
  id_formato_vacio: number;

  @IsNotEmpty()  
  documento_rellenado: Buffer;
}
