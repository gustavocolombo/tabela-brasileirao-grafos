import { ApiProperty } from '@nestjs/swagger';
import { JsonObject } from '@prisma/client/runtime/library';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTeamDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  yearFundation: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stadium: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stateOrigin: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsObject()
  color: JsonObject;
}
