import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from "class-validator";

import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateEventByTypeDto {
  @IsOptional()
  users: Usuario[]
  
  @IsNotEmpty()
  @IsNumber()
  type: number

  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsNumber()
  id_creador: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsDateString()
  start: Date
 
  @IsOptional()
  @IsDateString()
  end: Date
}