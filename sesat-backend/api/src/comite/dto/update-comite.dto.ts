import { PartialType } from '@nestjs/mapped-types';
import { CreateComiteDto } from './create-comite.dto';
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateComiteDto extends PartialType(CreateComiteDto) 
{
  @IsNotEmpty()
  @IsNumber()
  id_comite: number;
  
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
