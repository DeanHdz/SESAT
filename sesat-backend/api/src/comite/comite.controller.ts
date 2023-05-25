import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComiteService } from './comite.service';
import { CreateComiteDto } from './dto/create-comite.dto';
import { UpdateComiteDto } from './dto/update-comite.dto';

@Controller('comite')
export class ComiteController {
  constructor(private readonly comiteService: ComiteService) {}

  @Post()
  create(@Body() createComiteDto: CreateComiteDto) {
    return this.comiteService.create(createComiteDto);
  }

  @Get()
  findAll() {
    return this.comiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComiteDto: UpdateComiteDto) {
    return this.comiteService.update(+id, updateComiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comiteService.remove(+id);
  }
}
