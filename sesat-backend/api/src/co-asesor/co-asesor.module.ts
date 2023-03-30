import { Module } from '@nestjs/common';
import { CoAsesorService } from './co-asesor.service';
import { CoAsesorController } from './co-asesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoAsesor } from './entities/co-asesor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CoAsesor])],
  controllers: [CoAsesorController],
  providers: [CoAsesorService],
  exports: [CoAsesorService]
})
export class CoAsesorModule {}