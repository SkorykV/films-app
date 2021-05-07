import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

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

  // release year of the first film
  @Min(1888)
  @Max(new Date().getFullYear())
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
  @ValidateIf(o => !o.actorName)
  @IsNotEmpty({
    message: 'title or actor name should not be empty',
  })
  title!: string;

  @ValidateIf(o => !o.title)
  @IsNotEmpty({
    message: 'title or actor name should not be empty',
  })
  actorName!: string;
}
