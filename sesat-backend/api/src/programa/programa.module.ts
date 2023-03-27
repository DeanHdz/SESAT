import { Module } from '@nestjs/common';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';
import { Programa } from './entities/programa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Programa])],
  controllers: [ProgramaController],
  providers: [ProgramaService],
  exports: [ProgramaService]
})
export class ProgramaModule {}
