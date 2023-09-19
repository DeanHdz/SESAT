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
import { FormatoVacioService } from "./formato-vacio.service";
import { CreateFormatoVacioDto } from "./dto/create-formato-vacio.dto";

@Controller("formato-vacio")
export class FormatoVacioController {
  constructor(private readonly formatoVacioService: FormatoVacioService) {}

  @Post()
  create(@Body() createFormatoVacioDto: CreateFormatoVacioDto) {
    return this.formatoVacioService.create(createFormatoVacioDto);
  }

  @Get()
  findAll() {
    return this.formatoVacioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.formatoVacioService.findOne(+id);
  }

  @Put()
  update(@Body() updateFormatoVacioDto: CreateFormatoVacioDto) {
    return this.formatoVacioService.update(updateFormatoVacioDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.formatoVacioService.remove(+id);
  }
}
