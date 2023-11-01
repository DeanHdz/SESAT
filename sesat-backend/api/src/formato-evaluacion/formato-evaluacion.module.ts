import { Module } from "@nestjs/common";
import { FormatoEvaluacionService } from "./formato-evaluacion.service";
import { FormatoEvaluacionController } from "./formato-evaluacion.controller";
import { FormatoEvaluacion } from "./entities/formato-evaluacion.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { FormatoVacio } from "src/formato-vacio/entities/formato-vacio.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FormatoEvaluacion, Asignacion, FormatoVacio])],
  controllers: [FormatoEvaluacionController],
  providers: [FormatoEvaluacionService],
  exports: [FormatoEvaluacionService],
})
export class FormatoEvaluacionModule {}
