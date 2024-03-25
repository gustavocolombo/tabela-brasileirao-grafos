import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { TeamsInterface } from '../contracts/teams.interface';
import { Prisma, Team } from '@prisma/client';
import { CreateTeamDTO } from '../dtos/create-team.dto';

@Injectable()
export class TeamsRepository implements TeamsInterface {
  constructor(private prismaService: PrismaService) {}

  async create(team: CreateTeamDTO): Promise<Team> {
    const teamCreated = await this.prismaService.team.create({
      data: {
        ...team,
      },
    });

    return teamCreated;
  }

  async get(teamId: number): Promise<Team> {
    return this.prismaService.team.findUnique({ where: { id: teamId } });
  }

  async updateTeam({ ...rest }: Team): Promise<Team> {
    return await this.prismaService.team.update({
      where: { id: rest.id },
      data: {
        ...rest,
      },
    });
  }

  async updatePositionTeam(
    teamId: number,
    numberPosition: number,
  ): Promise<Team> {
    return await this.prismaService.team.update({
      where: { id: teamId },
      data: {
        position: numberPosition,
      },
    });
  }

  async orderDataTeams(): Promise<Partial<Team>[]> {
    return await this.prismaService.team.findMany({
      orderBy: [
        { position: 'desc' } && { points: 'desc' },
        { victories: 'desc' } && { defeats: 'desc' } && { draws: 'desc' } && {
            proGoals: 'desc',
          } && { ownGoals: 'desc' } && { redCards: 'desc' } && {
            yellowCards: 'desc',
          },
      ],
      select: {
        id: true,
        name: true,
        points: true,
        position: true,
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

  async orderByName(): Promise<any> {
    return await this.prismaService.team.groupBy({
      by: [
        'id',
        'name',
        'points',
        'position',
        'victories',
        'defeats',
        'draws',
        'proGoals',
        'ownGoals',
        'redCards',
        'yellowCards',
      ],
      orderBy: {
        name: 'asc',
      },
    });
  }
}
