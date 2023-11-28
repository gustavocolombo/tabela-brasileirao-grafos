import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../repositories/teams.repository';

@Injectable()
export class ShowClassificationService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute(): Promise<any> {
    const classification = await this.teamsRepository.getByVictories();

    return classification;
  }
}
