import { Module } from "@nestjs/common";
import { NotificacionService } from "./notification.service";
import { NotificacionController } from "./notification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notificacion } from "./entities/notification.entity";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { PeriodoModule } from "src/periodo/periodo.module";

@Module({
  imports: [
    PeriodoModule,
    TypeOrmModule.forFeature([Notificacion, Asignacion]),
  ],
  controllers: [NotificacionController],
  providers: [NotificacionService],
  exports: [NotificacionService],
})
export class NotificationModule {}
