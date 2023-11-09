import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComiteService } from './comite.service';
import { ComiteController } from './comite.controller';
import { Comite } from './entities/comite.entity';
import { Asignacion } from 'src/asignacion/entities/asignacion.entity';
import { TesisModule } from 'src/tesis/tesis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comite, Asignacion]), TesisModule],
  controllers: [ComiteController],
  providers: [ComiteService],
  exports: [ComiteService]
})
export class ComiteModule {}
