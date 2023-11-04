import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosAsesorexternoDto } from './create-datos-asesorexterno.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDatosAsesorexternoDto extends PartialType(CreateDatosAsesorexternoDto) {
    @IsNotEmpty()
    @IsNumber()
    id_datos_asesor_externo: number;

    @IsNotEmpty()
    @IsString()
    telefono: number;

    @IsNotEmpty()
    @IsString()
    institucion: string;
}
