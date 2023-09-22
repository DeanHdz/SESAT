import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";

export class CreateEventoDto {
@IsNotEmpty()
@IsNumber()
id_usuario: number;

@IsNotEmpty()
@IsString()
titulo: string;

@IsString()
descripcion: string;

@IsNotEmpty()
@IsDate()
fecha_inicio: Date;

@IsDate()
fecha_termino: Date;
}
