import { Module } from '@nestjs/common';
import { ActaEvaluacionService } from './acta-evaluacion.service';
import { ActaEvaluacionController } from './acta-evaluacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActaEvaluacion } from './entities/acta-evaluacion.entity';
import { FormatosVacios } from 'src/formatos-vacios/entities/formatos-vacios.entity';
import { FormatosVaciosService } from 'src/formatos-vacios/formatos-vacios.service';
import { FormatosVaciosModule } from 'src/formatos-vacios/formatos-vacios.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ActaEvaluacion,FormatosVacios],)
  ],
  controllers: [ActaEvaluacionController],
  providers: [ActaEvaluacionService],
  exports: [ActaEvaluacionService]  
})
export class ActaEvaluacionModule {}
