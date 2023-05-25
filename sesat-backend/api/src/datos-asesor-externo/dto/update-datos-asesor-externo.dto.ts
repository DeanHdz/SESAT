import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosAsesorExternoDto } from './create-datos-asesor-externo.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDatosAsesorExternoDto extends PartialType(CreateDatosAsesorExternoDto) {
    @IsNotEmpty()
    @IsNumber()
    id_datos_asesorexternos: number;

    @IsNotEmpty()
    @IsString()
    telefono?: string;

    @IsNotEmpty()
    @IsString()
    institucion?: string;
}
