import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeamsModule } from './modules/teams/teams.module';
import { GraphModule } from './modules/graphs/graph.module';

@Module({
  imports: [TeamsModule, GraphModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
