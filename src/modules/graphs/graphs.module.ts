import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { CreateGraphService } from './services/create-graph.service';
import { GraphsController } from './controllers/graphs.controller';
import { CreateClashService } from '../clashes/services/create-clash.service';
import { ClashesRepository } from '../clashes/repositories/clashes.repository';

@Module({
  controllers: [GraphsController],
  providers: [
    PrismaService,
    CreateGraphService,
    CreateClashService,
    ClashesRepository,
  ],
})
export class GraphsModule {}
