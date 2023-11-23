import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../repositories/teams.repository';
import { CreateTeamDTO } from '../dtos/create-team.dto';

@Injectable()
export class CreateTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(team: CreateTeamDTO): Promise<any> {
    const teamCreated = await this.teamsRepository.create(team);

    return teamCreated;
  }
}
