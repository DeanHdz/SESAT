import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateActaEvaluacionDto } from './create-acta-evaluacion.dto';

export class UpdateActaEvaluacionDto extends PartialType(CreateActaEvaluacionDto) {
    @IsNotEmpty()
    @IsNumber()
    id_acta: number;

    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;
    
    @IsNotEmpty()    
    documento_rellenado: string;

    @IsNotEmpty()
    @IsNumber()
    id_acta_vacia: number; 
}
