import { IsNotEmpty, IsNumber } from "class-validator";

//Esta clase representa lo que el usuario envia desde el lado del cliente

export class CreateActaEvaluacionDto {
    @IsNotEmpty()
    @IsNumber()
    id_acta: number;

    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;
    
    @IsNotEmpty()    
    documento_rellenado:string;

    @IsNotEmpty()
    @IsNumber()
    id_acta_vacia: number; 

    //NOTA: id_acta deberia ser auto incrementado?
    constructor(id_acta: number, id_asign: number, document: string, id_actaVacia: number){
        this.id_acta = id_acta;
        this.id_asignacion = id_asign;
        this.documento_rellenado = document;
        this.id_acta_vacia = id_actaVacia;
    }
    
}
