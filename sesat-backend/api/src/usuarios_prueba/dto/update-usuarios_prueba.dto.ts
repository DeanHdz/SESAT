import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosPruebaDto } from './create-usuarios_prueba.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUsuariosPruebaDto extends PartialType(CreateUsuariosPruebaDto) {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    clave_unica: number;

    @IsNotEmpty()
    @IsString()
    apellido_pat: string;

    @IsNotEmpty()
    @IsString()
    apellido_mat: string;

    @IsNotEmpty()
    @IsString()
    correo: string;

    @IsNotEmpty()
    @IsString()
    grado_estudio: string;

    @IsNotEmpty()
    @IsString()
    generacion: string;
}
