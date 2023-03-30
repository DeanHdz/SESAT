import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario])],
  controllers: [ComentarioController],
  providers: [ComentarioService],
  exports: [ComentarioService]
})
export class ComentarioModule {}
