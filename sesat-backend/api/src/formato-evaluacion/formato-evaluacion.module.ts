import { Module } from "@nestjs/common";
import { FormatoEvaluacionService } from "./formato-evaluacion.service";
import { FormatoEvaluacionController } from "./formato-evaluacion.controller";
import { FormatoEvaluacion } from "./entities/formato-evaluacion.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([FormatoEvaluacion])],
  controllers: [FormatoEvaluacionController],
  providers: [FormatoEvaluacionService],
  exports: [FormatoEvaluacionService],
})
export class FormatoEvaluacionModule {}
