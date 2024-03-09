/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../repositories/teams.repository';
import { Team } from '@prisma/client';

@Injectable()
export class ShowClassificationService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(): Promise<Partial<Team>[]> {
    const classification = await this.teamsRepository.orderDataTeams();

    let position = 0;

    for (let i = 0; i < classification.length - 1; i++) {
      if (
        classification.every((team) => team.points == classification[i].points)
      ) {
        const teamsSorted = await this.teamsRepository.orderByName();

        for (let i in classification) {
          position++;

          await this.teamsRepository.updatePositionTeam(
            teamsSorted[i].id,
            position,
          );
        }

        return teamsSorted;
      }
    }

    return classification;
  }
}
