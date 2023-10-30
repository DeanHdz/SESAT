import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const url = `example.com/auth/`;

    await this.mailerService.sendMail({
      to: "jesusgerardo.1315@hotmail.com", //HARD QUITAR IDIOTA
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Welcome to NSice App! Confirm your Email",
      template: "./confirmation",
      context: {
        name: "Jesus", //HARD QUITAR IDIOTA
        url,
      },
    });
  }
}
