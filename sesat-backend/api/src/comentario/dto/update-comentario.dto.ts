import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateComentarioDto } from './create-comentario.dto';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {
    @IsNotEmpty()
    @IsNumber()
    id_comentario: number;

    @IsNotEmpty()
    @IsNumber()
    Clave: number;

    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;

    @IsNotEmpty()
    @IsString()
    Texto: string;
}