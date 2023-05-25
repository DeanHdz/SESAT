import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosAlumnoDto: UpdateDatosAlumnoDto) {
    return this.datosAlumnoService.update(+id, updateDatosAlumnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosAlumnoService.remove(+id);
  }
}
