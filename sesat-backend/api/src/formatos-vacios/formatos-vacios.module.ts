import { Module } from '@nestjs/common';
import { FormatosVaciosService } from './formatos-vacios.service';
import { FormatosVaciosController } from './formatos-vacios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatosVacios } from './entities/formatos-vacios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatosVacios])],
  controllers: [FormatosVaciosController],
  providers: [FormatosVaciosService],
  exports: [FormatosVaciosService]
})
export class FormatosVaciosModule {}
