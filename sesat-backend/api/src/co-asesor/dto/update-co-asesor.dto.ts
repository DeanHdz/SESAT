import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCoAsesorDto } from './create-co-asesor.dto';

export class UpdateCoAsesorDto extends PartialType(CreateCoAsesorDto) {
    @IsNotEmpty()
    @IsNumber()
    Clave: number;

    @IsNotEmpty()
    @IsNumber()
    id_tesis: number;
}