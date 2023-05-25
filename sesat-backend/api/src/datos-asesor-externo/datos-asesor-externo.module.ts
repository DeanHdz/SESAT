import { Module } from '@nestjs/common';
import { DatosAsesorExternoService } from './datos-asesor-externo.service';
import { DatosAsesorExternoController } from './datos-asesor-externo.controller';

@Module({
  controllers: [DatosAsesorExternoController],
  providers: [DatosAsesorExternoService]
})
export class DatosAsesorExternoModule {}
