import { Module } from '@nestjs/common';
import { ComiteService } from './comite.service';
import { ComiteController } from './comite.controller';

@Module({
  controllers: [ComiteController],
  providers: [ComiteService]
})
export class ComiteModule {}
