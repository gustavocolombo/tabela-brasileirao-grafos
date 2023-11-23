import { Controller, Post } from '@nestjs/common';
import { CreateGraphService } from '../services/create-graph.service';
import { Graphs } from '@prisma/client';

@Controller('/graphs')
export class GraphsController {
  constructor(private createGraphService: CreateGraphService) {}

  @Post()
  async createTableSortGraph(): Promise<Graphs> {
    return await this.createGraphService.execute();
  }
}
