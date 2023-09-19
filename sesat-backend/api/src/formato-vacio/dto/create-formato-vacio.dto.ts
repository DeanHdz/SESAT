import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class CreateFormatoVacioDto {
    @IsNotEmpty()
    @IsNumber()
    id_formato_vacio: number;

    @IsOptional()    
    acta_evaluacion: string;

    @IsOptional()
    formato_evaluacion: string;
}
