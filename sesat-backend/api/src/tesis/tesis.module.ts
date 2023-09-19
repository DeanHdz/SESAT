import { Module } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { TesisController } from './tesis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './entities/tesis.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tesis, Asignacion])],
  controllers: [TesisController],
  providers: [TesisService],
  exports: [TesisService]
})
export class TesisModule {}
