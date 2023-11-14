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
import { CreateEventByTypeDto } from "./dto/create-evento-by-type.dto";
import { AsesorEventDto } from "./dto/asesor-evento-dto";

@Controller("evento")
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post("/asesorEvent")
  async postAsesorEvent(@Body() asesorEventDto: AsesorEventDto){
    return await this.eventoService.postAsesorEvent(asesorEventDto);
  }

  @Get("/participants/:title")
  async getParticipants(@Param("title") title: string)
  {
    return await this.eventoService.getParticipants(title);
  }

  @Get("/deleteByTitle/:title")
  async deleteAllThatShareTitle(@Param("title") title: string){
    return await this.eventoService.deleteAllThatShareTitle(title);
  }
  
  @Get("/byTitle/:title")
  async findAllThatShareTitle(@Param("title") title: string)
  {
    return await this.eventoService.findAllThatShareTitle(title);
  }
  
  @Post("/typed")
  async createAdminEventByType(@Body() createEventByTypeDto: CreateEventByTypeDto)
  {
    return await this.eventoService.createAdminEventByType(createEventByTypeDto);
  }

  @Get("/user/:id")
  async findByUserId(@Param("id") id: string)
  {
    return await this.eventoService.findByUserId(+id);
  }

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
