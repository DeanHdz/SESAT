import { IsNotEmpty, IsNumber, IsString } from "class-validator";

//Esta clase representa lo que el usuario envia desde el lado del cliente

export class CreateFormulario {
    @IsNotEmpty()
    @IsNumber()
    num_evaluacion: number;

    @IsNotEmpty()
    @IsString()
    ap_pat: string;

    @IsNotEmpty()
    @IsString()
    ap_mat: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
}
