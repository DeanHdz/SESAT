import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesorDto } from './create-asesor.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAsesorDto extends PartialType(CreateAsesorDto) {
  @IsNotEmpty()
  @IsNumber()
  Clave: number;

  @IsNotEmpty()
  @IsNumber()
  Sinodal: number;
}
