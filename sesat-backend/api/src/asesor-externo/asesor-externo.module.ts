import { Module } from '@nestjs/common';
import { AsesorExternoService } from './asesor-externo.service';
import { AsesorExternoController } from './asesor-externo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsesorExterno } from './entities/asesor-externo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsesorExterno])],
  controllers: [AsesorExternoController],
  providers: [AsesorExternoService],
  exports: [AsesorExternoService],
})
export class AsesorExternoModule {}