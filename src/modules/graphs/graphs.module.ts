import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { CreateGraphService } from './services/create-graph.service';
import { GraphsController } from './controllers/graphs.controller';

@Module({
  controllers: [GraphsController],
  providers: [PrismaService, CreateGraphService],
})
export class GraphsModule {}
