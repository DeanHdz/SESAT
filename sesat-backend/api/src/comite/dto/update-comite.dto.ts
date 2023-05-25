import { PartialType } from '@nestjs/mapped-types';
import { CreateComiteDto } from './create-comite.dto';

export class UpdateComiteDto extends PartialType(CreateComiteDto) {}
