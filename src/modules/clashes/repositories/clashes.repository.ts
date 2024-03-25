import { Injectable } from '@nestjs/common';
import { CrudClashesInterface } from '../contracts/crud-clashes.interface';
import { Clashes, Team } from '@prisma/client';
import { PrismaService } from '../../../shared/database/prisma.service';
import Graph, { Serialized } from 'graph-data-structure';

@Injectable()
export class ClashesRepository implements CrudClashesInterface {
  constructor(private prismaService: PrismaService) {}

  async create(homeTeamId: string, awayTeamId: string): Promise<Clashes> {
    const clash = await this.prismaService.clashes.create({
      data: {
        homeTeamId,
        awayTeamId,
      },
    });

    return clash;
  }

  async get(id: number): Promise<Clashes> {
    return await this.prismaService.clashes.findUnique({ where: { id } });
  }

  async getAll(): Promise<Clashes[]> {
    return await this.prismaService.clashes.findMany();
  }

  async update(
    id: number,
    winnerId: number,
    loserId: number,
    isDraw?: boolean,
  ): Promise<Clashes> {
    const clashUpdated = await this.prismaService.clashes.update({
      where: { id },
      data: {
        winnerTeamId: winnerId,
        loserTeamId: loserId,
        isDraw,
      },
    });

    return clashUpdated;
  }

  async delete(id: number, graphId: number): Promise<Clashes> {
    const recoverClash = await this.prismaService.clashes.findUnique({
      where: { id },
    });

    const recoverGraph = await this.prismaService.graphs.findUnique({
      where: {
        id: graphId,
      },
    });

    const graph = Graph(recoverGraph as unknown as Serialized);
    graph.removeEdge(recoverClash.homeTeamId, recoverClash.awayTeamId);
    graph.removeEdge(recoverClash.awayTeamId, recoverClash.homeTeamId);

    //to-do update graph database, remove target and source
    await this.prismaService.graphs.update({
      data: {
        links: graph.serialize().links,
      },
      where: {
        id: graphId,
      },
    });

    const clashDeleted = await this.prismaService.clashes.delete({
      where: {
        id,
      },
    });

    return clashDeleted;
  }

  async validateIfTeamIsInClash(
    clashId: number,
    firstTeamName: string,
    secondTeamName: string,
  ): Promise<boolean> {
    const search = await this.prismaService.clashes.findUnique({
      where: {
        id: clashId,
        AND: {
          homeTeamId: {
            contains: firstTeamName,
          },
          awayTeamId: {
            contains: secondTeamName,
          },
        },
      },
    });

    return true ? search !== null : false;
  }
}
