import { Module } from '@nestjs/common';
import { DatosAlumnoService } from './datos-alumno.service';
import { DatosAlumnoController } from './datos-alumno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosAlumno } from './entities/datos-alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatosAlumno])],
  controllers: [DatosAlumnoController],
  providers: [DatosAlumnoService],
  exports: [DatosAlumnoService],
})
export class DatosAlumnoModule {}
