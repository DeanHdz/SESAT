import { Module } from "@nestjs/common";
import { ActaEvaluacionService } from "./acta-evaluacion.service";
import { ActaEvaluacionController } from "./acta-evaluacion.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActaEvaluacion } from "./entities/acta-evaluacion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ActaEvaluacion])],
  controllers: [ActaEvaluacionController],
  providers: [ActaEvaluacionService],
  exports: [ActaEvaluacionService],
})
export class ActaEvaluacionModule {}
