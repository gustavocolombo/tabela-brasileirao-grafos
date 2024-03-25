import { Body, Controller, Put } from '@nestjs/common';
import { UpdateResultClashService } from '../services/update-result-clash.service';
import { Clashes } from '@prisma/client';
import { ResultClashDTO } from '../dtos/result-clash.dto';

@Controller('/clashes')
export class ClashesController {
  constructor(private updateClashService: UpdateResultClashService) {}

  @Put()
  async updateResultClash(
    @Body()
    { clashId, winnerGoals, loserGoals, winnerId, loserId }: ResultClashDTO,
  ): Promise<any> {
    return await this.updateClashService.execute({
      clashId,
      winnerGoals,
      loserGoals,
      winnerId,
      loserId,
    });
  }
}
