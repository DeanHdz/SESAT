import { Module } from "@nestjs/common";
import { AsignacionTesisService } from "./asignacion-tesis.service";
import { AsignacionTesisController } from "./asignacion-tesis.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AsignacionTesis } from "./entities/asignacion-tesis.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AsignacionTesis])],
  controllers: [AsignacionTesisController],
  providers: [AsignacionTesisService],
  exports: [AsignacionTesisService],
})
export class AsignacionTesisModule {}
