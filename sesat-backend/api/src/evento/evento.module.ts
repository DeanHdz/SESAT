import { Module } from "@nestjs/common";
import { EventoService } from "./evento.service";
import { EventoController } from "./evento.controller";
import { Evento } from "./entities/evento.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "src/usuario/usuario.module";

@Module({
  imports: [TypeOrmModule.forFeature([Evento]), UsuarioModule],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
