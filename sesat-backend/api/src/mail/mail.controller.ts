import { Body, Controller, Get, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("graded-assignment")
  sendMail(@Body() mailBody) {
    return this.mailService.assignmentGraded(mailBody.asignacion, mailBody.usuario);
  }
}
