import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaDto } from './create-programa.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProgramaDto extends PartialType(CreateProgramaDto) {
  @IsNotEmpty()
  @IsNumber()
  id_programa: number;

  @IsNotEmpty()
  @IsString()
  nombre_programa: string;
}
