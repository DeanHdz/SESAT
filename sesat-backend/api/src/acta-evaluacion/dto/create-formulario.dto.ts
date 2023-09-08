import { IsNotEmpty, IsNumber, IsString } from "class-validator";

//Esta clase representa lo que el usuario envia desde el lado del cliente

export class CreateFormulario {
    @IsNotEmpty()
    @IsString()
    fecha_eval: string;

    @IsNotEmpty()
    @IsString()
    ap_pat: string;

    @IsNotEmpty()
    @IsString()
    ap_mat: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    programa: string;

    @IsNotEmpty()
    @IsNumber()
    no_avance: number;

    @IsNotEmpty()
    @IsString()
    titulo_tesis: string;

    @IsNotEmpty()
    @IsString()
    total_avance: string;
      
    @IsNotEmpty()
    @IsString()
    comentarios: string; 
    
    @IsNotEmpty()
    @IsNumber()
    cal_doc: number; 

    @IsNotEmpty()
    @IsNumber()
    cal_expo: number; 

    @IsNotEmpty()
    @IsNumber()
    cal_dom: number; 

    @IsNotEmpty()
    @IsNumber()
    grado_avance: number; 

    @IsNotEmpty()
    @IsNumber()
    promedio: number;                       
       
    @IsNotEmpty()
    @IsString()
    fecha_toefl: string; 
          
    @IsNotEmpty()
    @IsNumber()
    puntaje_toefl: number; 

    @IsNotEmpty()
    @IsString()
    prox_toefl: string; 

    @IsNotEmpty()
    @IsString()
    observaciones: string;                                         
    
}
