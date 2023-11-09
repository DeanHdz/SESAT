import { Injectable } from "@nestjs/common";
import { CreateNotificacionDto } from "./dto/create-notification.dto";
import { UpdateNotificacionDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notificacion } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { MailService } from "src/mail/mail.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { PeriodoService } from "src/periodo/periodo.service";

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,
    @InjectRepository(Asignacion)
    private asignacionRepository: Repository<Asignacion>,
    private readonly periodoService: PeriodoService
  ) {}
  create(createNotificacionDto: CreateNotificacionDto) {
    return this.notificacionRepository.save(createNotificacionDto);
  }

  findAll() {
    return this.notificacionRepository.find();
  }

  findOne(id: number) {
    return this.notificacionRepository.findOne({
      where: { id_notificacion: id },
    });
  }

  findByUser(id: number) {
    return this.notificacionRepository.find({
      where: { id_usuario: id },
      order: { fecha_expedicion: "ASC" },
      take: 5,
    });
  }

  update(updateNotificacionDto: UpdateNotificacionDto) {
    return this.notificacionRepository.save(updateNotificacionDto);
  }

  remove(id: number) {
    return this.notificacionRepository.delete(id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async notifyClosedAssignment() {
    const currentDate = new Date();
    const periodo = await this.periodoService.findLatestPeriod();
    const asignaciones = await this.asignacionRepository.find({
      where: { id_periodo: periodo.id_periodo },
      relations: ["tesis"],
    });
    asignaciones.map((asignacion) => {
      if (asignacion.tipo == 1) {
        currentDate > periodo.fecha_cierre &&
          this.create({
            id_usuario: asignacion.tesis.id_usuario,
            titulo: "Asignación Cerrada",
            descripcion: `Su asignación ${asignacion.titulo} ha cerrado`,
            fecha_expedicion: new Date(),
          });
      } else if (asignacion.tipo == 2) {
        currentDate > periodo.fecha_cierre_opc &&
          this.create({
            id_usuario: asignacion.tesis.id_usuario,
            titulo: "Asignación Cerrada",
            descripcion: `Su asignación ${asignacion.titulo} ha cerrado`,
            fecha_expedicion: new Date(),
          });
      }
    });
  }
}
