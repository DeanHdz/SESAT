import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatosAsesorExternoService } from './datos-asesor-externo.service';
import { CreateDatosAsesorExternoDto } from './dto/create-datos-asesor-externo.dto';
import { UpdateDatosAsesorExternoDto } from './dto/update-datos-asesor-externo.dto';

@Controller('datos-asesor-externo')
export class DatosAsesorExternoController {
  constructor(private readonly datosAsesorExternoService: DatosAsesorExternoService) {}

  @Post()
  create(@Body() createDatosAsesorExternoDto: CreateDatosAsesorExternoDto) {
    return this.datosAsesorExternoService.create(createDatosAsesorExternoDto);
  }

  @Get()
  findAll() {
    return this.datosAsesorExternoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosAsesorExternoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosAsesorExternoDto: UpdateDatosAsesorExternoDto) {
    return this.datosAsesorExternoService.update(+id, updateDatosAsesorExternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosAsesorExternoService.remove(+id);
  }
}
