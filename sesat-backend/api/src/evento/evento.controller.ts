import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { EventoService } from "./evento.service";
import { CreateEventoDto } from "./dto/create-evento.dto";
import { UpdateEventoDto } from "./dto/update-evento.dto";

@Controller("evento")
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventoService.create(createEventoDto);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventoService.findOne(+id);
  }

  @Put()
  update(@Body() updateEventoDto: UpdateEventoDto) {
    return this.eventoService.update(updateEventoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventoService.remove(+id);
  }
}
