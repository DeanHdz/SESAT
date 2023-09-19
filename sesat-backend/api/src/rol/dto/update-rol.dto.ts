import { PartialType } from '@nestjs/mapped-types';
import { CreateRolDto } from './create-rol.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRolDto extends PartialType(CreateRolDto) {
    @IsNotEmpty()
    @IsNumber()
    id_rol: number;

    @IsNotEmpty()
    @IsString()
    nombre_rol: string;
}
