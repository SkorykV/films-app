import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/film.repository';
import { ActorRepository } from '../../actors/repository/actor.repository';
import { Film } from '../repository/film.entity';
import { NotFoundError } from '../../shared/types/errors.types';
import { GetFilmsDTO } from '../dto/get-films.dto';
import { CreateFilmWithActorsDTO } from '../dto/create-film-with-actors.dto';
import { Connection } from 'typeorm';
import { Actor } from 'src/actors/repository/actor.entity';
import { CreateActorDTO } from 'src/actors/dto/create-actor.dto';
import { ActorsServiceService } from 'src/actors/services/actors-service.service';
import { getFullName } from 'src/shared/helpers/name';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly actorRepository: ActorRepository,
    private readonly actorsService: ActorsServiceService,
    private readonly connection: Connection,
  ) {}

  async getFilms(getFilmsDTO: GetFilmsDTO): Promise<Film[]> {
    return this.filmRepository.getFilms(getFilmsDTO);
  }

  async getFilm(filmId: number): Promise<Film> {
    const film = await this.filmRepository.findOne(filmId);

    if (!film) {
      throw new NotFoundError(`Film with id "${filmId}" not found`);
    }

    return film;
  }

  async deleteFilm(filmId: number): Promise<void> {
    const success = await this.filmRepository.deleteFilm(filmId);

    if (!success) {
      throw new NotFoundError(`Film with id "${filmId}" not found`);
    }
  }

  async createFilm(
    createFilmWithActorsDTO: CreateFilmWithActorsDTO,
  ): Promise<Film> {
    const existingActors = await this.actorRepository.findActors(
      createFilmWithActorsDTO.stars,
    );
    const filmStars: Actor[] = createFilmWithActorsDTO.stars.map((filmStar) => {
      const existingActor = existingActors.find(
        (actor) =>
          actor.firstName === filmStar.firstName &&
          actor.lastName === filmStar.lastName,
      );
      return existingActor || this.actorRepository.create(filmStar);
    });
    return await this.filmRepository.createFilm(
      createFilmWithActorsDTO,
      filmStars,
    );
  }

  async createManyFilms(
    createFilmWithActorDTOs: CreateFilmWithActorsDTO[],
  ): Promise<number> {
    return await this.connection.transaction(async (manager) => {
      const actorRepository = manager.getCustomRepository(ActorRepository);
      const filmRepository = manager.getCustomRepository(FilmRepository);

      // 1. Insert films
      const insertedFilmIds = await filmRepository.createManyFilms(
        createFilmWithActorDTOs,
      );
      const insertedFilms = createFilmWithActorDTOs
        .map((filmDTO, i) => ({ ...filmDTO, id: insertedFilmIds[i] }))
        .filter((filmDTO) => filmDTO.id);

      // 2. Insert actors of successfully inserted films
      const allUniqueActorDTOs = this.getAllUniqueActors(insertedFilms);
      const actors = await actorRepository.getOrCreateMany(allUniqueActorDTOs);

      // 3. Add actors to films
      const actorsMap = this.actorsService.buildActorsMap(actors);
      for (const filmDTO of insertedFilms) {
        const filmActors = filmDTO.stars.map((star) =>
          actorsMap.get(getFullName(star)),
        );
        await filmRepository.addStars(filmDTO.id, filmActors);
      }

      return insertedFilms.length;
    });
  }

  private getAllUniqueActors(
    films: CreateFilmWithActorsDTO[],
  ): CreateActorDTO[] {
    return films.reduce((acc, film) => {
      const newActors = film.stars.filter(
        (filmStar) =>
          !acc.find(
            (actor) =>
              actor.firstName === filmStar.firstName &&
              actor.lastName === filmStar.lastName,
          ),
      );
      return acc.concat(newActors);
    }, []);
  }
}
