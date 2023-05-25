import { PartialType } from '@nestjs/mapped-types';
import { CreateFormatoEvaluacionDto } from './create-formato-evaluacion.dto';

export class UpdateFormatoEvaluacionDto extends PartialType(CreateFormatoEvaluacionDto) {}
