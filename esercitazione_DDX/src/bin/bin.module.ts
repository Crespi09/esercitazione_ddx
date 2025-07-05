import { Module } from '@nestjs/common';
import { BinService } from './bin.service';
import { BinController } from './bin.controller';

@Module({
  controllers: [BinController],
  providers: [BinService],
})
export class BinModule {}
