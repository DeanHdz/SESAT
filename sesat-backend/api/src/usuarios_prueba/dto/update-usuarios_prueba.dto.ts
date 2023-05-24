import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosPruebaDto } from './create-usuarios_prueba.dto';

export class UpdateUsuariosPruebaDto extends PartialType(CreateUsuariosPruebaDto) {}
