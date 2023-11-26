import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeamsModule } from './modules/teams/teams.module';
import { GraphsModule } from './modules/graphs/graphs.module';

@Module({
  imports: [TeamsModule, GraphsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
