import { IsNotEmpty, IsString } from "class-validator";

export class CreateDatosAsesorExternoDto {
    @IsNotEmpty()
    @IsString()
    telefono: string;

    @IsNotEmpty()
    @IsString()
    institucion: string;
}
