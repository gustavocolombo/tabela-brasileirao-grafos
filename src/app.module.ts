import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeamsModule } from './modules/teams/teams.module';
import { GraphsModule } from './modules/graphs/graphs.module';
import { ClashesModule } from './modules/clashes/clashs.module';

@Module({
  imports: [TeamsModule, GraphsModule, ClashesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
