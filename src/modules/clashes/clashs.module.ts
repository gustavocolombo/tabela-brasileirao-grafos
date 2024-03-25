import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { ClashesRepository } from './repositories/clashes.repository';
import { CreateClashService } from './services/create-clash.service';
import { ClashesController } from './controllers/clashes.controller';
import { UpdateResultClashService } from './services/update-result-clash.service';
import { TeamsRepository } from '../teams/repositories/teams.repository';

@Module({
  controllers: [ClashesController],
  providers: [
    PrismaService,
    ClashesRepository,
    CreateClashService,
    UpdateResultClashService,
    TeamsRepository,
  ],
})
export class ClashesModule {}
