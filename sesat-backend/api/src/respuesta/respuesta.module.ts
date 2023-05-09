import { Module } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta])],
  controllers: [RespuestaController],
  providers: [RespuestaService],
  exports: [RespuestaService]
})
export class RespuestaModule {}
