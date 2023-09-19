import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionDto } from './create-funcion.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFuncionDto extends PartialType(CreateFuncionDto) {
    @IsNotEmpty()
    @IsNumber()
    id_funcion: number;

    @IsNotEmpty()
    @IsString()
    nombre_funcion: string;
}