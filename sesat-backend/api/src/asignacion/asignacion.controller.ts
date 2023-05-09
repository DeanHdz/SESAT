import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @Post()
  create(@Body() createAsignacionDto: CreateAsignacionDto) {
    return this.asignacionService.create(createAsignacionDto);
  }

  @Get()
  findAll() {
    return this.asignacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionService.findOne(+id);
  }

  @Put(':id')
  update(@Body() updateAsignacionDto: UpdateAsignacionDto) {
    return this.asignacionService.update(updateAsignacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionService.remove(+id);
  }
}
