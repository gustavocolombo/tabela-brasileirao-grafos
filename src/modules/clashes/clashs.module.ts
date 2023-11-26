import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { ClashesRepository } from './repositories/clashes.repository';
import { CreateClashService } from './services/create-clash.service';

@Module({
  controllers: [],
  providers: [PrismaService, ClashesRepository, CreateClashService],
})
export class ClashesModule {}
