import { Module } from "@nestjs/common";
import { FuncionService } from "./funcion.service";
import { FuncionController } from "./funcion.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Funcion } from "./entities/funcion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Funcion])],
  controllers: [FuncionController],
  providers: [FuncionService],
  exports: [FuncionService],
})
export class FuncionModule {}