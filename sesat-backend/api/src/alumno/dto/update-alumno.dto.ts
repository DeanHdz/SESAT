import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAlumnoDto } from './create-alumno.dto';

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {
    @IsNotEmpty()
    @IsNumber()
    alumno_id: number;

    @IsNotEmpty()
    @IsNumber()
    clave: number;

    @IsNotEmpty()
    @IsNumber()
    estado_activo: number;

    @IsNotEmpty()
    @IsNumber()
    ultimo_avance: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;
}
