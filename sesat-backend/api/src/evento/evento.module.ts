import { Module } from "@nestjs/common";
import { EventoService } from "./evento.service";
import { EventoController } from "./evento.controller";
import { Evento } from "./entities/evento.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "src/usuario/usuario.module";
import { ComiteModule } from "src/comite/comite.module";
import { AsignacionModule } from "src/asignacion/asignacion.module";
import { NotificacionModule } from "src/notification/notification.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Evento]),
    UsuarioModule,
    ComiteModule,
    AsignacionModule,
    NotificacionModule,
  ],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
