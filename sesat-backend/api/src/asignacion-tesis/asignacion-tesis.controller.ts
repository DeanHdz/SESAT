import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsignacionTesisService } from './asignacion-tesis.service';
import { CreateAsignacionTesiDto } from './dto/create-asignacion-tesis.dto';
import { UpdateAsignacionTesiDto } from './dto/update-asignacion-tesis.dto';

@Controller('asignacion-tesis')
export class AsignacionTesisController {
  constructor(private readonly asignacionTesisService: AsignacionTesisService) {}

  @Post()
  create(@Body() createAsignacionTesiDto: CreateAsignacionTesiDto) {
    return this.asignacionTesisService.create(createAsignacionTesiDto);
  }

  @Get()
  findAll() {
    return this.asignacionTesisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionTesisService.findOne(+id);
  }

  @Get('/final-document/:id')
  findDocumentByID(@Param('id') id: string) {
    return this.asignacionTesisService.findDocumentByID(+id);
  }

  @Put()
  update(@Body() updateAsignacionTesiDto: UpdateAsignacionTesiDto) {
    return this.asignacionTesisService.update(updateAsignacionTesiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignacionTesisService.remove(+id);
  }
}
