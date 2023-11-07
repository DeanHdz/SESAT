import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class FilledFormat {
    @IsOptional()
    @IsNumber()
    id_formato_evaluacion: number;

    @IsNotEmpty()
    @IsString()
    titulo_reporte: string;

    @IsNotEmpty()
    @IsString()
    grado: string;

    @IsNotEmpty()
    @IsString()
    estudiante: string;

    @IsNotEmpty()
    @IsString()
    asesor: string;

    @IsNotEmpty()
    @IsString()
    coasesor: string;

    @IsNotEmpty() 
    @IsArray()   
    comite: Array<{
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
        nombre_funcion: string;
    }>;    

    @IsNotEmpty()
    @IsString()
    titulo_tesis: string;

    @IsNotEmpty()
    @IsString()
    fecha_comienzo: string;
      
    @IsNotEmpty()
    @IsString()
    fecha_limite: string;                                  
    
}
