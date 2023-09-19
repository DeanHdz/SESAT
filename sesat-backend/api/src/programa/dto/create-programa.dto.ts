import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProgramaDto {
  @IsNotEmpty()
  @IsNumber()
  id_programa: number;

  @IsNotEmpty()
  @IsString()
  nombre_programa: string;
}
