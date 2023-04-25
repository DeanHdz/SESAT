import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class CreateFormatosVacioDto {
    @IsNotEmpty()
    @IsNumber()
    id_formatos: number;

    @IsOptional()    
    acta_evaluacion: string;

    @IsOptional()
    formato_evaluacion: string;
}
