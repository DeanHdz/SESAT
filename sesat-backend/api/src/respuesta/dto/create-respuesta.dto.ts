import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRespuestaDto {
    @IsNotEmpty()
    @IsNumber()
    id_comentario: number;

    @IsNotEmpty()
    @IsNumber()
    id_usuario: number;

    @IsNotEmpty()
    @IsString()
    texto: string;
}
