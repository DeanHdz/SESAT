import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificacionDto {
    @IsNotEmpty()
    @IsNumber()
    id_usuario: number;

    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    decripcion: string;

    @IsNotEmpty()
    @IsDate()
    fecha_expedicion: Date;
}
