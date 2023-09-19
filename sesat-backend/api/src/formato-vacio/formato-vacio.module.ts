import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FormatoVacio } from "./entities/formato-vacio.entity";
import { FormatoVacioController } from "./formato-vacio.controller";
import { FormatoVacioService } from "./formato-vacio.service";

@Module({
  imports: [TypeOrmModule.forFeature([FormatoVacio])],
  controllers: [FormatoVacioController],
  providers: [FormatoVacioService],
  exports: [FormatoVacioService],
})
export class FormatoVacioModule {}
