import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
    id_rol: number;

    @IsOptional()
    @IsNumber()
    id_datos_alumno: number;

    @IsNotEmpty()
    @IsString()
    correo: string;

    @IsOptional()
    @IsNumber()
    id_datos_asesorexterno: number;
}
