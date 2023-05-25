import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosAsesorExternoDto } from './create-datos-asesor-externo.dto';

export class UpdateDatosAsesorExternoDto extends PartialType(CreateDatosAsesorExternoDto) {}
