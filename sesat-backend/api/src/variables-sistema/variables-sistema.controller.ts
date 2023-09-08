import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { VariablesSistemaService } from "./variables-sistema.service";
import { CreateVariablesSistemaDto } from "./dto/create-variables-sistema.dto";
import { UpdateVariablesSistemaDto } from "./dto/update-variables-sistema.dto";

@Controller("variables-sistema")
export class VariablesSistemaController {
  constructor(
    private readonly variablesSistemaService: VariablesSistemaService
  ) {}

  @Post()
  create(@Body() createVariablesSistemaDto: CreateVariablesSistemaDto) {
    return this.variablesSistemaService.create(createVariablesSistemaDto);
  }

  @Get()
  findAll() {
    return this.variablesSistemaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.variablesSistemaService.findOne(+id);
  }

  @Put()
  update(@Body() updateVariablesSistemaDto: UpdateVariablesSistemaDto) {
    return this.variablesSistemaService.update(updateVariablesSistemaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.variablesSistemaService.remove(+id);
  }
}
