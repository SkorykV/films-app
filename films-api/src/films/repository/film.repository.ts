import { InjectRepository } from '@nestjs/typeorm';
import { ActorRepository } from 'src/actors/repository/actor.repository';
import { EntityRepository, In, Repository } from 'typeorm';
import { CreateFilmDTO } from '../dto/create-film.dto';
import { Film } from './film.entity';
import { Injectable } from '@nestjs/common';
import { GetFilmsDTO } from '../dto/get-films.dto';
import { Actor } from 'src/actors/repository/actor.entity';
import { InnerError, InputError } from 'src/shared/types/errors.types';
import { CreateFilmWithActorsDTO } from '../dto/create-film-with-actors.dto';
import { DB_ERROR_CODES } from 'src/shared/types/db.types';

@EntityRepository(Film)
export class FilmRepository extends Repository<Film> {
  async getFilms(getFilmsDTO: GetFilmsDTO): Promise<Film[]> {
    const { title, actorName, sort } = getFilmsDTO;

    const query = this.createQueryBuilder('film');

    if (title) {
      query.andWhere('(film.title ILIKE :search)', { search: `%${title}%` });
    }

    if (actorName) {
      query.leftJoin('film.stars', 'actor_search');

      const actorSearchParts = actorName.split(' ', 2);

      if (actorSearchParts.length > 1) {
        query.where(
          'actor_search.firstName ILIKE :firstName AND actor_search.lastName ILIKE :lastName',
          {
            firstName: `%${actorSearchParts[0]}%`,
            lastName: `%${actorSearchParts[1]}%`,
          },
        );
      } else {
        query.where(
          'actor_search.firstName ILIKE :search OR actor_search.lastName ILIKE :search',
          {
            search: `%${actorSearchParts[0]}%`,
          },
        );
      }
    }

    query.leftJoinAndMapMany('film.stars', 'film.stars', 'star');

    query.orderBy('film.title', sort);

    return query.getMany();
  }

  async createFilm(
    createFilmDTO: CreateFilmDTO,
    stars?: Actor[],
  ): Promise<Film> {
    try {
      const film = this.create(createFilmDTO);
      if (stars) {
        film.stars = stars;
      }
      return await film.save();
    } catch (error) {
      if (error.code === DB_ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION) {
        throw new InputError(
          `Film with "${createFilmDTO.title}" title already exists`,
        );
      }

      throw new InnerError(
        'Something went wrong with film saving. Try again later',
      );
    }
  }

  async deleteFilm(id: number): Promise<boolean> {
    const results = await this.delete({ id });
    return !!results.affected;
  }

  async createManyFilms(createFilmDTOs: CreateFilmDTO[]) {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Film)
      .values(createFilmDTOs)
      .onConflict(`("title") DO NOTHING`)
      .execute();

    return result.identifiers.map((filmResult) => filmResult && filmResult.id);
  }

  async addStars(filmId: number, actors: Actor[]): Promise<void> {
    await this.createQueryBuilder()
      .relation(Film, 'stars')
      .of(filmId)
      .add(actors);
  }
}
