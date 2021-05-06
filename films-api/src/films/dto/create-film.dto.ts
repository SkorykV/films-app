import { IsIn, IsInt, Length, Max, Min } from 'class-validator';
import { FILM_FORMAT } from '../types/film-format.enum';

export class CreateFilmDTO {
  @Length(3, 100)
  title: string;

  // release year of the first film
  @Min(1888)
  @Max(new Date().getFullYear())
  @IsInt()
  releaseYear: number;

  @IsIn(Object.values(FILM_FORMAT))
  format: FILM_FORMAT;
}
