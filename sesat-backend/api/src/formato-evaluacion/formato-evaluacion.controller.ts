import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FormatoEvaluacionService } from './formato-evaluacion.service';
import { UpdateFormatoEvaluacionDto } from './dto/update-formato-evaluacion.dto';
import { FilledFormat } from './dto/create-formulario.dto';

@Controller('formato-evaluacion')
export class FormatoEvaluacionController {
  constructor(private readonly formatoEvaluacionService: FormatoEvaluacionService) {}

  @Post('review/:idAsignacion')
  async create(@Param('idAsignacion') idAsignacion: string, @Body() fillActa: FilledFormat) {
    return this.formatoEvaluacionService.createActaAndfillDocument(+idAsignacion, fillActa);
  }

  @Get()
  findAll() {
    return this.formatoEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatoEvaluacionService.findOne(+id);
  }

  @Get('document-data/:id')
  findDocumentData(@Param('id') id: string) {
    return this.formatoEvaluacionService.findDocumentData(+id);
  }

  @Put()
  update(@Body() updateFormatoEvaluacionDto: UpdateFormatoEvaluacionDto) {
    return this.formatoEvaluacionService.update(updateFormatoEvaluacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatoEvaluacionService.remove(+id);
  }
}
