import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DatosAlumnoService } from './datos-alumno.service';
import { CreateDatosAlumnoDto } from './dto/create-datos-alumno.dto';
import { UpdateDatosAlumnoDto } from './dto/update-datos-alumno.dto';

@Controller('datos-alumno')
export class DatosAlumnoController {
  constructor(private readonly datosAlumnoService: DatosAlumnoService) {}

  @Post()
  create(@Body() createDatosAlumnoDto: CreateDatosAlumnoDto) {
    return this.datosAlumnoService.create(createDatosAlumnoDto);
  }

  @Get()
  findAll() {
    return this.datosAlumnoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosAlumnoService.findOne(+id);
  }

  @Get('user/:id')
  fetchByUserId(@Param('id') id: string) {
    return this.datosAlumnoService.fetchByUserId(+id);
  }

  @Put()
  update(@Body() updateDatosAlumnoDto: UpdateDatosAlumnoDto) {
    return this.datosAlumnoService.update(updateDatosAlumnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosAlumnoService.remove(+id);
  }
}
