import { Module } from '@nestjs/common';
import { ModalidadService } from './modalidad.service';
import { ModalidadController } from './modalidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modalidad } from './entities/modalidad.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Modalidad])],
  controllers: [ModalidadController],
  providers: [ModalidadService],
  exports: [ModalidadService],
})
export class ModalidadModule {}
