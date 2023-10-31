import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async newAssignment(asignacion: Asignacion, usuario: Usuario) {
    await this.mailerService.sendMail({
      to: usuario.correo,
      subject: "Se ha publicado una asignacion",
      template: "./newAssignment",
      context: {
        name: usuario.nombre,
        assignment: asignacion.titulo,
      },
    });
  }

  async assignmentGraded() {
    const url = `example.com/auth/`;

    await this.mailerService.sendMail({
      to: "jesusgerardo.1315@hotmail.com", //HARD QUITAR IDIOTA
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Se ha calificado su asignacion",
      template: "./transactional",
      context: {
        name: "Equisde", //HARD QUITAR IDIOTA
        url,
      },
    });
  }

  async reminder() {
    const url = `example.com/auth/`;

    await this.mailerService.sendMail({
      to: "jesusgerardo.1315@hotmail.com", //HARD QUITAR IDIOTA
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Recordatorio: Quedan x tiempo para entregar su asignacion",
      template: "./transactional",
      context: {
        name: "Equisde", //HARD QUITAR IDIOTA
        url,
      },
    });
  }
}
