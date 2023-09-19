import { PartialType } from '@nestjs/mapped-types';
import { CreateGradoEstudioDto } from './create-grado-estudio.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateGradoEstudioDto extends PartialType(CreateGradoEstudioDto) {
    @IsNotEmpty()
    @IsNumber()
    id_grado_estudio: number;
  
    @IsNotEmpty()
    @IsString()
    nombre_grado_estudio: string;
}
