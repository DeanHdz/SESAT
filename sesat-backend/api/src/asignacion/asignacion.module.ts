import { Module } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { AsignacionController } from './asignacion.controller';

@Module({
  controllers: [AsignacionController],
  providers: [AsignacionService]
})
export class AsignacionModule {}
