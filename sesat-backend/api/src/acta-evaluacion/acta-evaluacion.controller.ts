import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ActaEvaluacionService } from './acta-evaluacion.service';
import { UpdateActaEvaluacionDto } from './dto/update-acta-evaluacion.dto';
import { FilledActDto } from './dto/create-formulario.dto';


@Controller('acta-evaluacion')
export class ActaEvaluacionController {
  constructor(
    private readonly actaEvaluacionService: ActaEvaluacionService
  ) { }
  /*
  @Post()
  createActaEvaluacion(@Body() createActaEvaluacion: CreateActaEvaluacionDto) {
    return this.actaEvaluacionService.createActaEvaluacion(createActaEvaluacion);
  }*/
  
  @Post('review/:idAsignacion')
  async create(@Param('idAsignacion') idAsignacion: string, @Body() fillActa: FilledActDto) {
    return this.actaEvaluacionService.createActaAndfillDocument(+idAsignacion, fillActa);
  }

  @Get()
  findAll() {
    return this.actaEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actaEvaluacionService.findOne(+id);
  }

  @Get('members/:idAsignacion')
  findComiteMembers(@Param('idAsignacion') idAsignacion: string) {
    return this.actaEvaluacionService.findComiteMembers(+idAsignacion);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActaEvaluacionDto: UpdateActaEvaluacionDto) {
    return this.actaEvaluacionService.update(updateActaEvaluacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actaEvaluacionService.remove(+id);
  }
}
