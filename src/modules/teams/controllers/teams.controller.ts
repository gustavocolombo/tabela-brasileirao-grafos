import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeamService } from '../services/create-team.service';
import { CreateTeamDTO } from '../dtos/create-team.dto';
import { Team } from '@prisma/client';
import { ShowClassificationService } from '../services/show-classification.service';

@Controller('/teams')
export class TeamsController {
  constructor(
    private createTeamService: CreateTeamService,
    private showClassService: ShowClassificationService,
  ) {}

  @Post()
  async createTeam(@Body() team: CreateTeamDTO): Promise<Team> {
    return this.createTeamService.execute(team);
  }

  @Get()
  async getClassification(): Promise<Team[]> {
    return await this.showClassService.execute();
  }
}
