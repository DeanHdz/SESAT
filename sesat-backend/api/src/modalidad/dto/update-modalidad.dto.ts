import { PartialType } from '@nestjs/mapped-types';
import { CreateModalidadDto } from './create-modalidad.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateModalidadDto extends PartialType(CreateModalidadDto) {
    @IsNotEmpty()
    @IsNumber()
    id_modalidad: number;
  
    @IsNotEmpty()
    @IsString()
    nombre_modalidad: string;
}
