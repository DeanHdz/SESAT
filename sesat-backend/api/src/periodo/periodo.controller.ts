import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PeriodoService } from './periodo.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Controller('periodo')
export class PeriodoController {
  constructor(private readonly periodoService: PeriodoService) {}

  @Post()
  create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodoService.create(createPeriodoDto);
  }

  @Get()
  findAll() {
    return this.periodoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodoService.findOne(+id);
  }

  @Get('last/period')
  findLatestPeriod() {
    return this.periodoService.getRowWithMaxNumber();
  }

  @Put()
  update(@Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodoService.update(updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodoService.remove(+id);
  }
}
