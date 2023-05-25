import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosAlumnoDto } from './create-datos-alumno.dto';

export class UpdateDatosAlumnoDto extends PartialType(CreateDatosAlumnoDto) {}
