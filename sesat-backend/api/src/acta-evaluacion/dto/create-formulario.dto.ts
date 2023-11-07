import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

//Nota este DTO se usa unicamente en acta evaluacion y no corresponde
//a los campos de la tabla, sino a los campos del acta de evaluacion
//que es el documento que se guarda en esta tabla

export class FilledActDto {
    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;

    @IsOptional()
    @IsNumber()
    id_acta_evaluacion: number;

    @IsNotEmpty()
    @IsString()
    grado_estudio: string;

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
