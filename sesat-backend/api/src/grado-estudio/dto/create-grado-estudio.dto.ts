import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGradoEstudioDto {
    @IsNotEmpty()
    @IsNumber()
    id_grado_estudio: number;
  
    @IsNotEmpty()
    @IsString()
    nombre_grado_estudio: string;
}
