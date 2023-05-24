import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsNumber()
    clave: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    family_name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    role: number;

    @IsNotEmpty()
    @IsBoolean()
    active_status: boolean;

    @IsNotEmpty()
    @IsNumber()
    modalidad: number;
}
