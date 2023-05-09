import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRespuestaDto {
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
