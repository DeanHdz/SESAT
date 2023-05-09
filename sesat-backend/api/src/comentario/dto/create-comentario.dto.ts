import { isNotEmpty, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateComentarioDto {
    @IsNotEmpty()
    @IsNumber()
    clave: number;

    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;

    @IsNotEmpty()
    @IsString()
    texto: string;

}

