import { Module, forwardRef } from "@nestjs/common";
import { AsignacionService } from "./asignacion.service";
import { AsignacionController } from "./asignacion.controller";
import { Asignacion } from "./entities/asignacion.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { ActaEvaluacion } from "src/acta-evaluacion/entities/acta-evaluacion.entity";
import { MailModule } from "src/mail/mail.module";

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([Asignacion, Tesis])],
  controllers: [AsignacionController],
  providers: [AsignacionService],
  exports: [AsignacionService],
})
export class AsignacionModule {}
