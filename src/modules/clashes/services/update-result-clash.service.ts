import { BadRequestException, Injectable } from '@nestjs/common';
import { ClashesRepository } from '../repositories/clashes.repository';
import { ResultClashDTO } from '../dtos/result-clash.dto';
import { TeamsRepository } from '../../teams/repositories/teams.repository';
import { Clashes } from '@prisma/client';

@Injectable()
export class UpdateResultClashService {
  constructor(
    private clashRepository: ClashesRepository,
    private teamsRepository: TeamsRepository,
  ) {}

  async execute({
    clashId,
    winnerId,
    loserId,
    winnerGoals,
    loserGoals,
  }: ResultClashDTO): Promise<any> {
    const [winner, loser, clash] = await Promise.allSettled([
      await this.teamsRepository.get(winnerId),
      await this.teamsRepository.get(loserId),
      await this.clashRepository.get(clashId),
    ]);

    if (winner.status === 'rejected' || loser.status === 'rejected') {
      throw new BadRequestException('Error at search teams, try again');
    } else if (clash.status === 'rejected') {
      throw new BadRequestException('Error at search clash, try again');
    }

    let updatedClash: Clashes;
    const result = winnerGoals - loserGoals;

    const validatedTeams = await this.clashRepository.validateIfTeamIsInClash(
      clashId,
      winner.value.name,
      loser.value.name,
    );

    if (!validatedTeams) {
      throw new BadRequestException(
        'Teams are not compatible with this clash, try again',
      );
    }

    if (result > 0) {
      updatedClash = await this.clashRepository.update(
        clash.value.id,
        winner.value.id,
        loser.value.id,
        false,
      );

      winner.value.proGoals = winnerGoals;
      winner.value.ownGoals = loserGoals;

      loser.value.proGoals = loserGoals;
      loser.value.ownGoals = winnerGoals;

      winner.value.goalsDifference += result;
      loser.value.goalsDifference -= result;

      winner.value.victories++;
      loser.value.defeats++;

      winner.value.points += 3;

      const updateWinner = await this.teamsRepository.updateTeam({
        ...winner.value,
      });

      const updateLoser = await this.teamsRepository.updateTeam({
        ...loser.value,
      });

      return updatedClash;
    } else {
      updatedClash = await this.clashRepository.update(
        clash.value.id,
        null,
        null,
        true,
      );

      const teamOne = winner.value;
      const teamTwo = loser.value;

      teamOne.draws++;
      teamTwo.draws++;

      teamOne.proGoals += winnerGoals;
      teamOne.ownGoals += loserGoals;

      teamTwo.proGoals += loserGoals;
      teamTwo.ownGoals += winnerGoals;

      teamOne.points += 1;
      teamTwo.points += 1;

      const updateTeamOne = await this.teamsRepository.updateTeam({
        ...teamOne,
      });

      const updateTeamTwo = await this.teamsRepository.updateTeam({
        ...teamTwo,
      });

      return updatedClash;
    }
  }
}
