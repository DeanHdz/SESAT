import { Module } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { TesisController } from './tesis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './entities/tesis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tesis])],
  controllers: [TesisController],
  providers: [TesisService],
  exports: [TesisService]
})
export class TesisModule {}
