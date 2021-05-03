import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import * as Yup from 'yup';

import { FILM_FORMAT } from '../types/film-format.enum';
import { Actor, CreateActorDTO } from './Actor';

export interface Film {
  id: number;
  title: string;
  releaseYear: number;
  format: FILM_FORMAT;
}

export interface FilmDetails extends Film {
  stars: Actor[];
}

export class CreateFilmDTO {
  @Length(3, 100)
  title!: string;

  @IsInt()
  releaseYear!: number;

  @IsIn(Object.values(FILM_FORMAT))
  format!: FILM_FORMAT;
}

export class CreateFilmWithActorsDTO extends CreateFilmDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateActorDTO)
  @IsArray()
  stars!: CreateActorDTO[];
}

export class FilterFilmsDTO {
  title!: string;

  actorName!: string;
}
