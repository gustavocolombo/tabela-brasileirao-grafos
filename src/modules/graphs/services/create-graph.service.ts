import { BadRequestException, Injectable } from '@nestjs/common';
import { Graph } from 'graph-data-structure';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class CreateGraphService {
  constructor(private prismaService: PrismaService) {}

  async execute(): Promise<any> {
    const graph = Graph();

    const teams = await this.prismaService.team.findMany();

    if (teams.length < 2) return new BadRequestException('Insuficient teams');

    teams.forEach((team) => {
      graph.addNode(team.name);
    });

    let k = 0;
    let j = 0;

    while (j != graph.nodes().length - 1) {
      for (let i = j + 1; i < graph.nodes().length; i++) {
        if (teams[k].name != teams[i].name) {
          graph.addEdge(teams[k].name, teams[i].name);
          graph.addEdge(teams[i].name, teams[k].name);

          await this.prismaService.clashes.create({
            data: {
              homeTeamId: teams[k].name,
              awayTeamId: teams[i].name,
            },
          });

          await this.prismaService.clashes.create({
            data: {
              homeTeamId: teams[i].name,
              awayTeamId: teams[k].name,
            },
          });
        }

        //fazer com que o grafo ande um time pra frente
        if (i == graph.nodes().length - 1) k++ && j++;

        //gerar um ciclo no grafo para que todos joguem contra todos
        if (
          i + 1 == graph.nodes().length - 1 &&
          graph.outdegree(teams[i].name) != graph.nodes().length - 1
        ) {
          for (let m = 0; m < i; m++) {
            if (
              teams[m].name != teams[k].name &&
              !graph.hasEdge(teams[k].name, teams[m].name)
            ) {
              graph.addEdge(teams[k].name, teams[m].name);

              await this.prismaService.clashes.create({
                data: {
                  homeTeamId: teams[k].name,
                  awayTeamId: teams[m].name,
                },
              });

              await this.prismaService.clashes.create({
                data: {
                  homeTeamId: teams[m].name,
                  awayTeamId: teams[k].name,
                },
              });
            }
          }
        }
      }
    }

    const nodesSerialized = [{}];

    graph.nodes().forEach((team) => {
      nodesSerialized.push({ id: team });
    });

    const arrayWithNodes = nodesSerialized;

    arrayWithNodes.shift();

    const graphDatabase = await this.prismaService.graphs.create({
      data: {
        nodes: arrayWithNodes,
        links: graph.serialize().links,
      },
    });

    return graphDatabase;
  }
}
