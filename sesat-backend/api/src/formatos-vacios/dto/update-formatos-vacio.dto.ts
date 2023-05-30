import { PartialType } from '@nestjs/mapped-types';
import { CreateFormatosVacioDto } from './create-formatos-vacio.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateFormatosVacioDto extends PartialType(CreateFormatosVacioDto) {
    @IsNotEmpty()
    @IsNumber()
    id_formatos_vacios: number;

    @IsOptional()    
    acta_evaluacion: string;

    @IsOptional()
    formato_evaluacion: string;
}
