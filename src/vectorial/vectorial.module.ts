import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VectorialService } from './service/vectorial/vectorial.service';

@Module({
  imports: [PrismaModule],
  providers: [VectorialService],
  exports: [VectorialService],
})
export class VectorialModule {}
