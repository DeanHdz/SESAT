import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCoAsesorDto {
    @IsNotEmpty()
    @IsNumber()
    Clave: number;

    @IsNotEmpty()
    @IsNumber()
    id_tesis: number;
}
