import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateComentarioDto } from './create-comentario.dto';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
    @IsNotEmpty()
    @IsNumber()
    id_comentario: number;

    @IsNotEmpty()
    @IsNumber()
    clave_usuario: number;

    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;

    @IsNotEmpty()
    @IsString()
    texto: string;
}