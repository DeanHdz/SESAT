import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsNumber()
    clave_usuario: number;

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
