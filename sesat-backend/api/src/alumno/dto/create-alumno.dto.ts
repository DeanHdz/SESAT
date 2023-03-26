import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAlumnoDto {
    @IsNotEmpty()
    @IsNumber()
    Clave: number;

    @IsNotEmpty()
    @IsNumber()
    EstadoActivo: number;

    @IsNotEmpty()
    @IsNumber()
    Ultimo_Avance: number;
}
