import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

//Esta clase representa lo que el usuario envia desde el lado del cliente

export class CreateActaEvaluacionDto {
  @IsOptional()
  documento_rellenado: string;

  @IsNotEmpty()
  @IsNumber()
  id_acta_vacia: number;

  /* Comentado en lo que se para que sirve*/

  /*constructor(
    id_acta: number,
    id_asign: number,
    document: string,
    id_actaVacia: number
  ) {
    this.id_acta_evaluacion = id_acta;
    //this.id_asignacion = id_asign;
    this.documento_rellenado = document;
    this.id_acta_vacia = id_actaVacia;
  }*/
}
