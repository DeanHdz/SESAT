import { Module } from "@nestjs/common";
import { PeriodoService } from "./periodo.service";
import { PeriodoController } from "./periodo.controller";
import { Periodo } from "./entities/periodo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Periodo])],
  controllers: [PeriodoController],
  providers: [PeriodoService],
  exports: [PeriodoService],
})
export class PeriodoModule {}
