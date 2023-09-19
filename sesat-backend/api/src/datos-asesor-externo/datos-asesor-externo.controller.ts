import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DatosAsesorexternoService } from './datos-asesor-externo.service';
import { CreateDatosAsesorexternoDto } from './dto/create-datos-asesorexterno.dto';
import { UpdateDatosAsesorexternoDto } from './dto/update-datos-asesorexterno.dto';

@Controller('datos-asesorexterno')
export class DatosAsesorexternoController {
  constructor(private readonly datosAsesorexternoService: DatosAsesorexternoService) {}

  @Post()
  create(@Body() createDatosAsesorexternoDto: CreateDatosAsesorexternoDto) {
    return this.datosAsesorexternoService.create(createDatosAsesorexternoDto);
  }

  @Get()
  findAll() {
    return this.datosAsesorexternoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosAsesorexternoService.findOne(+id);
  }

  @Put()
  update(@Body() updateDatosAsesorexternoDto: UpdateDatosAsesorexternoDto) {
    return this.datosAsesorexternoService.update(updateDatosAsesorexternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosAsesorexternoService.remove(+id);
  }
}
