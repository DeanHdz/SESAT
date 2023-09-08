import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FormatoEvaluacionService } from './formato-evaluacion.service';
import { CreateFormatoEvaluacionDto } from './dto/create-formato-evaluacion.dto';
import { UpdateFormatoEvaluacionDto } from './dto/update-formato-evaluacion.dto';

@Controller('formato-evaluacion')
export class FormatoEvaluacionController {
  constructor(private readonly formatoEvaluacionService: FormatoEvaluacionService) {}

  @Post()
  create(@Body() createFormatoEvaluacionDto: CreateFormatoEvaluacionDto) {
    return this.formatoEvaluacionService.create(createFormatoEvaluacionDto);
  }

  @Get()
  findAll() {
    return this.formatoEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatoEvaluacionService.findOne(+id);
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
