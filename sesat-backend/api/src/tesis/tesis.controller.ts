import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { CreateTesisDto } from './dto/create-tesis.dto';
import { UpdateTesisDto } from './dto/update-tesis.dto';

@Controller('tesis')
export class TesisController {
  constructor(private readonly tesisService: TesisService) {}

  @Post()
  create(@Body() createTesisDto: CreateTesisDto) {
    return this.tesisService.create(createTesisDto);
  }

  @Get()
  findAll() {
    return this.tesisService.findAll();
  }

  @Get('/active')
  findActive() {
    return this.tesisService.findActive();
  }

  @Get('/inactive')
  findInactive() {
    return this.tesisService.findInactive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tesisService.findOne(+id);
  }
  @Get('/per-student/:id')
  findTesisPerStudent(@Param('id') id: string) {
    return this.tesisService.findTesisPerStudent(+id);
  }

  @Put()
  update(@Body() updateTesisDto: UpdateTesisDto) {
    return this.tesisService.update(updateTesisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tesisService.remove(+id);
  }
}
