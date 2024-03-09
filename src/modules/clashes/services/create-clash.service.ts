import { Injectable } from '@nestjs/common';
import { Clashes } from '@prisma/client';
import { ClashesRepository } from '../repositories/clashes.repository';

@Injectable()
export class CreateClashService {
  constructor(private clashesRepository: ClashesRepository) {}

  async execute(homeTeamId: string, awayTeamId: string): Promise<Clashes> {
    return await this.clashesRepository.create(homeTeamId, awayTeamId);
  }
}
