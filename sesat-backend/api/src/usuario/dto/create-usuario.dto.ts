import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsNumber()
    clave: number;
}
