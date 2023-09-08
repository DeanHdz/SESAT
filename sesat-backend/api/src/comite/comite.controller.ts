import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { ComiteService } from "./comite.service";
import { CreateComiteDto } from "./dto/create-comite.dto";
import { UpdateComiteDto } from "./dto/update-comite.dto";

@Controller("comite")
export class ComiteController {
  constructor(private readonly comiteService: ComiteService) {}

  @Post()
  create(@Body() CreateComiteDto: CreateComiteDto) {
    return this.comiteService.create(CreateComiteDto);
  }

  @Get()
  findAll() {
    return this.comiteService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.comiteService.findOne(+id);
  }

  @Get("/per-asesor/:id")
  findPerAsesor(@Param("id") id: string) {
    return this.comiteService.findPerAsesor(+id);
  }

  @Get("/per-tesis/:id")
  findPerTesis(@Param("id") id: string) {
    return this.comiteService.findPerTesis(+id);
  }

  @Put()
  update(@Body() updateComiteDto: UpdateComiteDto) {
    return this.comiteService.update(updateComiteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.comiteService.remove(+id);
  }
}
