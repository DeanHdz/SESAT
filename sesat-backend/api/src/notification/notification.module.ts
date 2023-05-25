import { Module } from "@nestjs/common";
import { NotificacionService } from "./notification.service";
import { NotificacionController } from "./notification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notificacion } from "./entities/notification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  controllers: [NotificacionController],
  providers: [NotificacionService],
  exports: [NotificacionService],
})
export class NotificationModule {}
