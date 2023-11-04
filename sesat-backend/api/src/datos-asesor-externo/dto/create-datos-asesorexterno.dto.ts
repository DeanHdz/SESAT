import { IsNotEmpty, IsString } from "class-validator";

export class CreateDatosAsesorexternoDto {
    @IsNotEmpty()
    @IsString()
    telefono: number;

    @IsNotEmpty()
    @IsString()
    institucion: string;
}
