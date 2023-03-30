import { isNotEmpty, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateComentarioDto {
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

