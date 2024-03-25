import { Team } from '@prisma/client';
import { CreateTeamDTO } from '../dtos/create-team.dto';

export interface TeamsInterface {
  create(team: CreateTeamDTO): Promise<Team>;
  get(teamId: number): Promise<Team | null>;
  orderDataTeams(): Promise<Partial<Team>[]>;
  orderByName(): Promise<any>;
  updatePositionTeam(numberPosition: number, teamId: number): Promise<Team>;
  updateTeam(team: Team): Promise<Team>;
}
