import { Module } from "@nestjs/common";
import { VariablesSistemaService } from "./variables-sistema.service";
import { VariablesSistemaController } from "./variables-sistema.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VariablesSistema } from "./entities/variables-sistema.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VariablesSistema])],
  controllers: [VariablesSistemaController],
  providers: [VariablesSistemaService],
  exports: [VariablesSistemaService],
})
export class VariablesSistemaModule {}
