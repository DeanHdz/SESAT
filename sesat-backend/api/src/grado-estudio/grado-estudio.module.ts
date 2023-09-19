import { Module } from '@nestjs/common';
import { GradoEstudioService } from './grado-estudio.service';
import { GradoEstudioController } from './grado-estudio.controller';
import { GradoEstudio } from './entities/grado-estudio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GradoEstudio])],
  controllers: [GradoEstudioController],
  providers: [GradoEstudioService],
  exports: [GradoEstudioService]
})
export class GradoEstudioModule {}
