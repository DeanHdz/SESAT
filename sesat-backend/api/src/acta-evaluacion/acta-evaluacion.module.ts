import { Module } from "@nestjs/common";
import { ActaEvaluacionService } from "./acta-evaluacion.service";
import { ActaEvaluacionController } from "./acta-evaluacion.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActaEvaluacion } from "./entities/acta-evaluacion.entity";
import { FormatoVacio } from "src/formato-vacio/entities/formato-vacio.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ActaEvaluacion, FormatoVacio, Asignacion])],
  controllers: [ActaEvaluacionController],
  providers: [ActaEvaluacionService],
  exports: [ActaEvaluacionService],
})
export class ActaEvaluacionModule {}
