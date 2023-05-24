import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsNumber()
    clave: number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido_paterno: string;

    @IsNotEmpty()
    @IsString()
    apellido_materno: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    rol: number;

    @IsNotEmpty()
    @IsBoolean()
    estado_activo: boolean;

    @IsNotEmpty()
    @IsNumber()
    modalidad: number;
}
