import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAlumnoDto {
    @IsNotEmpty()
    @IsNumber()
    alumno_id: number;

    @IsNotEmpty()
    @IsNumber()
    clave: number;

    @IsNotEmpty()
    @IsNumber()
    estado_activo: number;

    @IsNotEmpty()
    @IsNumber()
    ultimo_avance: number;
}
