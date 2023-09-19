import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateComiteDto 
{
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
  
  @IsNotEmpty()
  @IsNumber()
  id_tesis: number;
  
  @IsNotEmpty()
  @IsNumber()
  id_funcion: number;
}
