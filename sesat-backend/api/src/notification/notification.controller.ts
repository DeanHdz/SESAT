import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { NotificacionService } from "./notification.service";
import { CreateNotificacionDto } from "./dto/create-notification.dto";
import { UpdateNotificacionDto } from "./dto/update-notification.dto";

@Controller("notification")
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificacionDto) {
    return this.notificacionService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificacionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificacionService.findOne(+id);
  }

  @Get("/user/:id")
  findByUser(@Param("id") id: string) {
    return this.notificacionService.findByUser(+id);
  }

  @Put()
  update(@Body() updateNotificationDto: UpdateNotificacionDto) {
    return this.notificacionService.update(updateNotificationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificacionService.remove(+id);
  }
}
