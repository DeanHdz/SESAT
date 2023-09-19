import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FormatosVaciosService } from './formatos-vacios.service';
import { CreateFormatoVacioDto } from './dto/create-formato-vacio.dto';
import { UpdateFormatoVacioDto } from './dto/update-formato-vacio.dto';



@Controller('formato-vacio')
export class formatoVacioController {
  constructor(private readonly formatoVacioService: FormatosVaciosService) {}

  @Post()
  create(@Body() createformatoVacioDto: CreateFormatoVacioDto) {
    return this.formatoVacioService.create(createformatoVacioDto);
  }

  @Get()
  findAll() {
    return this.formatoVacioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatoVacioService.findOne(+id);
  }

  @Put()
  update(@Body() updateformatoVacioDto: UpdateFormatoVacioDto) {
    return this.formatoVacioService.update(updateformatoVacioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatoVacioService.remove(+id);
  }
}
