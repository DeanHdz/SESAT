import { PartialType } from '@nestjs/mapped-types';
import { CreateCoAsesorDto } from './create-co-asesor.dto';

export class UpdateCoAsesorDto extends PartialType(CreateCoAsesorDto) {}
