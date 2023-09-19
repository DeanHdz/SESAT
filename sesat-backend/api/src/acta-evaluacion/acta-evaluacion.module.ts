import { Module } from '@nestjs/common';
import { ActaEvaluacionService } from './acta-evaluacion.service';
import { ActaEvaluacionController } from './acta-evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaEvaluacion } from './entities/acta-evaluacion.entity';
import { FormatosVaciosService } from 'src/formato-vacio/formatos-vacios.service';
import { FormatosVaciosModule } from 'src/formato-vacio/formatos-vacios.module';
import { FormatoVacio } from 'src/formato-vacio/entities/formato-vacio.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ActaEvaluacion,FormatoVacio],)
  ],
  controllers: [ActaEvaluacionController],
  providers: [ActaEvaluacionService],
  exports: [ActaEvaluacionService]  
})
export class ActaEvaluacionModule {}
