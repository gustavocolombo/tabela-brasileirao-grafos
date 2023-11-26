import { Clashes } from '@prisma/client';

export interface CrudClashesInterface {
  create(homeTeamId: string, awayTeamId: string): Promise<Clashes>;
  get(id: number): Promise<Clashes>;
  getAll(): Promise<Clashes[]>;
  update(): Promise<Clashes>;
  delete(id: number, graphId: number): Promise<Clashes>;
}
