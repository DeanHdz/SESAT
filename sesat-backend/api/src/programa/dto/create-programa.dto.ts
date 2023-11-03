import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProgramaDto {
  @IsNotEmpty()
  @IsString()
  nombre_programa: string;
}
