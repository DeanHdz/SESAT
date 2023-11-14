import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
} from "class-validator";

export class AsesorEventDto {
  @IsNotEmpty()
  @IsNumber()
  id_tesis: number
  
  @IsNotEmpty()
  @IsBoolean()
  presentacion: boolean

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number

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