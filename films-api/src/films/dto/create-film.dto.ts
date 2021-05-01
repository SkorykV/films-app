import { IsIn, IsInt, Length } from 'class-validator';
import { FILM_FORMAT } from '../types/film-format.enum';

export class CreateFilmDTO {
  @Length(3, 100)
  title: string;

  @IsInt()
  releaseYear: number;

  @IsIn(Object.values(FILM_FORMAT))
  format: FILM_FORMAT;
}
