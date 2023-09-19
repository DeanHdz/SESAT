import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradoEstudioService } from './grado-estudio.service';
import { CreateGradoEstudioDto } from './dto/create-grado-estudio.dto';
import { UpdateGradoEstudioDto } from './dto/update-grado-estudio.dto';

@Controller('grado-estudio')
export class GradoEstudioController {
  constructor(private readonly gradoEstudioService: GradoEstudioService) {}

  @Post()
  create(@Body() createGradoEstudioDto: CreateGradoEstudioDto) {
    return this.gradoEstudioService.create(createGradoEstudioDto);
  }

  @Get()
  findAll() {
    return this.gradoEstudioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradoEstudioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradoEstudioDto: UpdateGradoEstudioDto) {
    return this.gradoEstudioService.update(+id, updateGradoEstudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradoEstudioService.remove(+id);
  }
}
