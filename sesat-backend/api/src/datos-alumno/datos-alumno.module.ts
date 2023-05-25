import { Module } from '@nestjs/common';
import { DatosAlumnoService } from './datos-alumno.service';
import { DatosAlumnoController } from './datos-alumno.controller';

@Module({
  controllers: [DatosAlumnoController],
  providers: [DatosAlumnoService]
})
export class DatosAlumnoModule {}
