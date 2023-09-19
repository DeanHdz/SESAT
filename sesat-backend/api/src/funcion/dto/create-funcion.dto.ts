import { IsNotEmpty, IsString } from "class-validator";

export class CreateFuncionDto {
    @IsNotEmpty()
    @IsString()
    nombre_funcion: string;
}
