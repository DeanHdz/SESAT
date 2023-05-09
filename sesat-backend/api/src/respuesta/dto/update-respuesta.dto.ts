import { PartialType } from '@nestjs/mapped-types';
import { CreateRespuestaDto } from './create-respuesta.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRespuestaDto extends PartialType(CreateRespuestaDto) {
    @IsNotEmpty()
    @IsNumber()
    id_respuesta: number;

    @IsNotEmpty()
    @IsNumber()
    id_comentario: number;

    @IsNotEmpty()
    @IsString()
    texto: string;

    @IsNotEmpty()
    @IsNumber()
    clave: number;
}