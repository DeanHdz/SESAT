import { PartialType } from '@nestjs/mapped-types';
import { CreateEventoDto } from './create-evento.dto';
import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";

export class UpdateEventoDto extends PartialType(CreateEventoDto) {
    @IsNotEmpty()
    @IsNumber()
    id_evento: number;
    
    @IsNotEmpty()
    @IsNumber()
    id_usuario: number;
    
    @IsNotEmpty()
    @IsString()
    titulo: string;
    
    @IsString()
    descripcion: string;
    
    @IsNotEmpty()
    @IsDate()
    fecha_inicio: Date;
    
    @IsDate()
    fecha_termino: Date;
}
