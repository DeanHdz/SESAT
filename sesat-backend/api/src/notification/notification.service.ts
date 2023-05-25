import { Injectable } from "@nestjs/common";
import { CreateNotificacionDto } from "./dto/create-notification.dto";
import { UpdateNotificacionDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notificacion } from "./entities/notification.entity";
import { Repository } from "typeorm";

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>
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

  update(updateNotificacionDto: UpdateNotificacionDto) {
    return this.notificacionRepository.save(updateNotificacionDto);
  }

  remove(id: number) {
    return this.notificacionRepository.delete(id);
  }
}
