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
  presentation: boolean

  @IsNotEmpty()
  @IsNumber()
  id_usuario: number

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsDateString()
  start: string
  
  @IsOptional()
  @IsDateString()
  end: string
}