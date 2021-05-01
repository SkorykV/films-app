import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { InputError } from 'src/shared/types/errors.types';
import { CreateFilmWithActorsDTO } from '../dto/create-film-with-actors.dto';
import { FilmRawDataField } from '../types/film-raw-data.type';

@Injectable()
export class FilmsParserService {
  async parseFilmsFromBuffer(
    buffer: Buffer,
  ): Promise<CreateFilmWithActorsDTO[]> {
    const fileContent = buffer.toString('utf-8');
    const filmsData = fileContent.split(/(?:\r?\n){2}/);
    return Promise.all(filmsData.map((film) => this.parseFilm(film)));
  }

  private async parseFilm(
    data: string,
    fieldsSeparator = /\r?\n/,
  ): Promise<CreateFilmWithActorsDTO> {
    const fields = data.split(fieldsSeparator);
    const plainfilmDTO = {};
    for (const field of fields) {
      const [key, rawValue] = field.split(': ');
      const [parsedKey, parsedValue] = this.parseFilmValue(key, rawValue);
      plainfilmDTO[parsedKey] = parsedValue;
    }

    const filmDTO = plainToClass(CreateFilmWithActorsDTO, plainfilmDTO);
    const errors = await validate(filmDTO);
    if (errors.length > 0) {
      throw new InputError('File has incorrect format');
    }

    return filmDTO;
  }

  private parseFilmValue(
    key: string,
    value: string,
  ): [
    keyof CreateFilmWithActorsDTO,
    CreateFilmWithActorsDTO[keyof CreateFilmWithActorsDTO],
  ] {
    switch (key) {
      case FilmRawDataField.title:
        return ['title', value];
      case FilmRawDataField.releaseYear:
        return ['releaseYear', parseInt(value, 10)];
      case FilmRawDataField.format:
        return ['format', value];
      case FilmRawDataField.stars:
        const actors = value.split(', ').map((actor) => {
          const [firstName, lastName] = actor.split(' ');
          return { firstName, lastName };
        });
        return ['stars', actors];
      default:
        throw new Error('Unexpected Film field in raw data');
    }
  }
}
