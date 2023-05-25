import { Module } from "@nestjs/common";
import { DatosAsesorExternoService } from "./datos-asesor-externo.service";
import { DatosAsesorExternoController } from "./datos-asesor-externo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatosAsesorExterno } from "./entities/datos-asesor-externo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DatosAsesorExterno])],
  controllers: [DatosAsesorExternoController],
  providers: [DatosAsesorExternoService],
  exports: [DatosAsesorExternoService],
})
export class DatosAsesorExternoModule {}
