import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVariablesSistemaDto {
    @IsNotEmpty()
    @IsNumber()
    indice_clave_asesorexterno: number;  
}
