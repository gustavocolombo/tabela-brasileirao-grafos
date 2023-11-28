import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { CrudTeamsInterface } from '../contracts/crud-teams.interface';
import { Team } from '@prisma/client';
import { CreateTeamDTO } from '../dtos/create-team.dto';

@Injectable()
export class TeamsRepository implements CrudTeamsInterface {
  constructor(private prismaService: PrismaService) {}
  async create(team: CreateTeamDTO): Promise<Team> {
    const teamCreated = await this.prismaService.team.create({
      data: {
        ...team,
      },
    });

    return teamCreated;
  }

  async getByVictories(): Promise<Partial<Team>[]> {
    return await this.prismaService.team.findMany({
      orderBy: [
        { victories: 'desc' },
        { defeats: 'desc' },
        { draws: 'desc' },
        { proGoals: 'desc' },
        { ownGoals: 'desc' },
        { redCards: 'desc' },
        { yellowCards: 'desc' },
      ],
      select: {
        name: true,
        victories: true,
        defeats: true,
        draws: true,
        proGoals: true,
        ownGoals: true,
        redCards: true,
        yellowCards: true,
      },
    });
  }

  get(): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  update(): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  disqualify(): Promise<Team> {
    throw new Error('Method not implemented.');
  }
}
