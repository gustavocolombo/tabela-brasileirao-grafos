import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ResultClashDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  clashId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  winnerId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  loserId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  winnerGoals: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  loserGoals: number;
}
