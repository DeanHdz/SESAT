import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoAsesorService } from './co-asesor.service';
import { CreateCoAsesorDto } from './dto/create-co-asesor.dto';
import { UpdateCoAsesorDto } from './dto/update-co-asesor.dto';

@Controller('co-asesor')
export class CoAsesorController {
  constructor(private readonly coAsesorService: CoAsesorService) {}

  @Post()
  create(@Body() createCoAsesorDto: CreateCoAsesorDto) {
    return this.coAsesorService.create(createCoAsesorDto);
  }

  @Get()
  findAll() {
    return this.coAsesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coAsesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoAsesorDto: UpdateCoAsesorDto) {
    return this.coAsesorService.update(+id, updateCoAsesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coAsesorService.remove(+id);
  }
}
