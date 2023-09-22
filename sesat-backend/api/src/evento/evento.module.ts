import { Module } from "@nestjs/common";
import { EventoService } from "./evento.service";
import { EventoController } from "./evento.controller";
import { Evento } from "./entities/evento.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}
