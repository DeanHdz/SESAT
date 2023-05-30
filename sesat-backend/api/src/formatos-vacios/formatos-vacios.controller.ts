import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FormatosVaciosService } from './formatos-vacios.service';
import { CreateFormatosVacioDto } from './dto/create-formatos-vacio.dto';
import { UpdateFormatosVacioDto } from './dto/update-formatos-vacio.dto';

@Controller('formatos-vacios')
export class FormatosVaciosController {
  constructor(private readonly formatosVaciosService: FormatosVaciosService) {}

  @Post()
  create(@Body() createFormatosVacioDto: CreateFormatosVacioDto) {
    return this.formatosVaciosService.create(createFormatosVacioDto);
  }

  @Get()
  findAll() {
    return this.formatosVaciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatosVaciosService.findOne(+id);
  }

  @Put()
  update(@Body() updateFormatosVacioDto: UpdateFormatosVacioDto) {
    return this.formatosVaciosService.update(updateFormatosVacioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatosVaciosService.remove(+id);
  }
}
