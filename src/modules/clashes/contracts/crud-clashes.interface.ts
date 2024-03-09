import { Clashes, Team } from '@prisma/client';

export interface CrudClashesInterface {
  create(homeTeamId: string, awayTeamId: string): Promise<Clashes>;
  get(id: number): Promise<Clashes>;
  getAll(): Promise<Clashes[]>;
  update(id: number, winnerId: number, loserId: number): Promise<Clashes>;
  delete(id: number, graphId: number): Promise<Clashes>;
}
