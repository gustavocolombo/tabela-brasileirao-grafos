import { Team } from '@prisma/client';
import { CreateTeamDTO } from '../dtos/create-team.dto';

export interface CrudTeamsInterface {
  create(team: CreateTeamDTO): Promise<Team>;
  get(name: string): Promise<Team | null>;
  update(): Promise<Team>;
  disqualify(name: string): Promise<Team>;
}
