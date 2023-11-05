import { PartialType } from '@nestjs/mapped-types';
import { CreateVariablesSistemaDto } from './create-variables-sistema.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateVariablesSistemaDto extends PartialType(CreateVariablesSistemaDto) {
    @IsNotEmpty()
    @IsNumber()
    id_variables_sistema: number;

    @IsNotEmpty()
    @IsNumber()
    indice_clave_asesor_externo: number;

}
