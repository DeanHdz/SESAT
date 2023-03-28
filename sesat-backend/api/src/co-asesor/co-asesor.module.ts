import { Module } from '@nestjs/common';
import { CoAsesorService } from './co-asesor.service';
import { CoAsesorController } from './co-asesor.controller';

@Module({
  controllers: [CoAsesorController],
  providers: [CoAsesorService]
})
export class CoAsesorModule {}
