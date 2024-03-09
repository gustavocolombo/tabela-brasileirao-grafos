import { Module } from '@nestjs/common';
import { TeamsRepository } from './repositories/teams.repository';
import { CreateTeamService } from './services/create-team.service';
import { TeamsController } from './controllers/teams.controller';
import { PrismaService } from '../../shared/database/prisma.service';
import { ShowClassificationService } from './services/show-classification.service';

@Module({
  controllers: [TeamsController],
  providers: [
    PrismaService,
    TeamsRepository,
    CreateTeamService,
    ShowClassificationService,
  ],
})
export class TeamsModule {}
