import { Module } from '@nestjs/common';
import { FormatosVaciosService } from './formatos-vacios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatoVacio } from './entities/formato-vacio.entity';
import { formatoVacioController } from './formato-vacio.controller';


@Module({
  imports: [TypeOrmModule.forFeature([FormatoVacio])],
  controllers: [formatoVacioController],
  providers: [FormatosVaciosService],
  exports: [FormatosVaciosService]
})
export class FormatosVaciosModule {}
