import { Injectable } from "@nestjs/common";
import { CreateNotificacionDto } from "./dto/create-notification.dto";
import { UpdateNotificacionDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notificacion } from "./entities/notification.entity";
import { Repository } from "typeorm";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,
    private mailService: MailService
  ) {}
  create(createNotificacionDto: CreateNotificacionDto) {
    return this.notificacionRepository.save(createNotificacionDto);
  }

  findAll() {
    this.mailService.sendUserConfirmation();
    return this.notificacionRepository.find();
  }

  findOne(id: number) {
    return this.notificacionRepository.findOne({
      where: { id_notificacion: id },
    });
  }

  findByUser(id: number) {
    return this.notificacionRepository.find({ where: { id_usuario: id } });
  }

  update(updateNotificacionDto: UpdateNotificacionDto) {
    return this.notificacionRepository.save(updateNotificacionDto);
  }

  remove(id: number) {
    return this.notificacionRepository.delete(id);
  }
}
