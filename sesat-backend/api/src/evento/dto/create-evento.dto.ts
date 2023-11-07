import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  IsDateString,
} from "class-validator";

export class CreateEventoDto {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsNumber()
  id_creador: number;

  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;

  @IsOptional()
  @IsDateString()
  fecha_termino: Date;
}
