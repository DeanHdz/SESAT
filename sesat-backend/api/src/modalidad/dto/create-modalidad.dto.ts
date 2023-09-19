import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateModalidadDto {
    @IsNotEmpty()
    @IsNumber()
    id_modalidad: number;
  
    @IsNotEmpty()
    @IsString()
    nombre_modalidad: string;
}
