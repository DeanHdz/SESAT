import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComiteService } from './comite.service';
import { ComiteController } from './comite.controller';
import { Comite } from './entities/comite.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comite, Asignacion])],
  controllers: [ComiteController],
  providers: [ComiteService],
  exports: [ComiteService]
})
export class ComiteModule {}
