import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamService } from '../services/create-team.service';
import { CreateTeamDTO } from '../dtos/create-team.dto';

@Controller('/teams')
export class TeamsController {
  constructor(private createTeamService: CreateTeamService) {}

  @Post()
  async createTeam(@Body() team: CreateTeamDTO): Promise<any> {
    return this.createTeamService.execute(team);
  }
}
