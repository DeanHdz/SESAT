import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateFormatoVacioDto } from './create-formato-vacio.dto';

export class UpdateFormatoVacioDto extends PartialType(CreateFormatoVacioDto) {
    @IsNotEmpty()
    @IsNumber()
    id_formato_vacio: number;

    @IsOptional()    
    acta_evaluacion: string;

    @IsOptional()
    formato_evaluacion: string;
}
