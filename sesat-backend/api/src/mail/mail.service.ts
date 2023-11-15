import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { AsignacionService } from "src/asignacion/asignacion.service";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { TesisService } from "src/tesis/tesis.service";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectRepository(Asignacion)
    private readonly asignacionRepository: Repository<Asignacion>,
    private tesisService: TesisService
  ) {}

  async newAssignment(asignacion: Asignacion, usuario: Usuario) {
    await this.mailerService.sendMail({
      to: usuario.correo,
      subject: "Se ha publicado una asignación",
      template: "./newAssignment",
      context: {
        name: usuario.nombre,
        assignment: asignacion.titulo,
      },
    });
  }

  async assignmentGraded(asignacion: Asignacion, usuario: Usuario) {
    await this.mailerService.sendMail({
      to: usuario.correo,
      subject: "Se ha calificado su asignación",
      template: "./gradedAssignment",
      context: {
        name: usuario.nombre,
        assignment: asignacion.titulo,
      },
    });
    return true;
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async reminder() {
    const validDays = [60, 30, 15, 7, 4, 2, 1];
    let diff, days;
    const asignaciones = await this.asignacionRepository.find({
      where: { estado_entrega: 0 },
      relations: ["periodo"],
    });

    function dateStr(day) {
      switch (day) {
        case 60:
          return "Dos meses";
        case 30:
          return "Un mes";
        case 15:
          return "Dos semanas";
        case 7:
          return "Una semana";
        case 4:
          return "4 días";
        case 2:
          return "2 días";
        case 1:
          return "1 día";
        default:
          return "Unknown";
      }
    }

    asignaciones.map(async (asignacion) => {
      const tesis = await this.tesisService.findOne(asignacion.id_tesis);
      asignacion.tipo == 1
        ? (diff =
            asignacion.periodo.fecha_cierre.getTime() - new Date().getTime())
        : (diff =
            asignacion.periodo.fecha_cierre_opc.getTime() -
            new Date().getTime());

      days = Math.trunc(diff / (1000 * 60 * 60 * 24));

      if (validDays.includes(days)) {
        await this.mailerService.sendMail({
          to: "jesusgerardo.1315@hotmail.com",
          subject: "Recordatorio cierre de asignación",
          template: "./reminder",
          context: {
            name: tesis.alumno.nombre,
            assignment: asignacion.titulo,
            date: dateStr(days),
          },
        });
      }
    });
  }
}
