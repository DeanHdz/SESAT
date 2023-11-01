import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateComentarioDto {
    @IsNotEmpty()
    @IsNumber()
    id_usuario: number;

    @IsNotEmpty()
    @IsNumber()
    id_asignacion: number;

    @IsNotEmpty()
    @IsString()
    texto: string;

    @IsNotEmpty()
    @IsDateString()
    fecha_comentario: Date;


}

