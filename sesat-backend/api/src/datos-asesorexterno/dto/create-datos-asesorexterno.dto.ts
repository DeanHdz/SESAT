import { IsNotEmpty, IsString } from "class-validator";

export class CreateDatosAsesorexternoDto {
    @IsNotEmpty()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsString()
    institucion: string;
}
