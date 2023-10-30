import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateActaEvaluacionDto {
  constructor(    
    document: Buffer,
    id_actaVacia: number
  ) {    
    this.id_acta_vacia = id_actaVacia;
    this.documento_rellenado = document;    
  }
  @IsNotEmpty()
  @IsNumber()
  id_acta_vacia: number;

  @IsNotEmpty()  
  documento_rellenado: Buffer;
  
}
