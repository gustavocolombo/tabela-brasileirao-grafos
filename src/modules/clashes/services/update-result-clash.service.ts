import { BadRequestException, Injectable } from '@nestjs/common';
import { ClashesRepository } from '../repositories/clashes.repository';
import { ResultClashDTO } from '../dtos/result-clash.dto';
import { TeamsRepository } from '../../teams/repositories/teams.repository';

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

    const updatedClash = await this.clashRepository.update(
      clash.value.id,
      winner.value.id,
      loser.value.id,
    );

    const result = winnerGoals - loserGoals;

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

    //call show classification
  }
}
