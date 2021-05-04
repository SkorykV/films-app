import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ActorRepository } from 'src/actors/repository/actor.repository';
import { ActorsService } from 'src/actors/services/actors.service';
import { FilmRepository } from 'src/films/repository/film.repository';
import { NotFoundError } from 'src/shared/types/errors.types';
import { Connection } from 'typeorm';

import { FilmsService } from '../films.service';
import {
  createFilmDtoMock,
  createManyFilmsMock,
  filmActorsMock,
} from '../__mocks__/films.service.mock';
import { Actor } from 'src/actors/repository/actor.entity';

function mapToActors(actorDTOs) {
  return actorDTOs.map((actor, i) => {
    const actorInstance = new Actor();
    actorInstance.id = i + 1;
    actorInstance.firstName = actor.firstName;
    actorInstance.lastName = actor.lastName;
    return actorInstance;
  });
}

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepositoryMock;
  let actorRepositoryMock;
  let connectionMock;
  let managerMock;

  beforeEach(async () => {
    filmRepositoryMock = {
      findOne: sinon.stub().resolves('filmMock'),
      deleteFilm: sinon.stub().resolves(true),
      getFilms: sinon.stub().resolves(['film1', 'film2']),
      createFilm: sinon.stub().resolves('createdFilm'),
      createManyFilms: sinon.stub(),
      addStars: sinon.stub().resolves(),
    };
    actorRepositoryMock = {
      findActors: sinon.stub(),
      create: sinon.stub(),
      getOrCreateMany: sinon.stub(),
    };
    managerMock = {
      getCustomRepository(Class) {
        if (Class === ActorRepository) {
          return actorRepositoryMock;
        } else {
          return filmRepositoryMock;
        }
      },
    };
    connectionMock = {
      transaction: sinon.stub((func) => func(managerMock)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        ActorsService,
        {
          provide: FilmRepository,
          useValue: filmRepositoryMock,
        },
        {
          provide: ActorRepository,
          useValue: actorRepositoryMock,
        },
        {
          provide: Connection,
          useValue: connectionMock,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).to.be.not.undefined;
  });

  describe('getFilm', () => {
    let filmId;
    let actualResult;

    describe('when film is present in DB', () => {
      beforeEach(async () => {
        filmId = 1;

        actualResult = await service.getFilm(filmId);
      });

      it('should call repository method with filmId', () => {
        expect(filmRepositoryMock.findOne).to.have.been.calledWith(filmId);
      });

      it('should resolve with result from the repository', () => {
        expect(actualResult).to.equal('filmMock');
      });
    });

    describe('when film isn`t present in DB', () => {
      beforeEach(() => {
        filmId = 1;

        filmRepositoryMock.findOne.resolves(undefined);
      });

      it('should reject', () => {
        return expect(service.getFilm(filmId)).to.eventually.be.rejectedWith(
          NotFoundError,
        );
      });
    });
  });

  describe('deleteFilm', () => {
    let filmId;

    describe('when film is present in DB', () => {
      beforeEach(() => {
        filmId = 1;
      });

      it('should call repository method with filmId', async () => {
        await service.deleteFilm(filmId);
        expect(filmRepositoryMock.deleteFilm).to.have.been.calledWith(filmId);
      });

      it('should resolve', () => {
        return expect(service.deleteFilm(filmId)).to.eventually.not.be.rejected;
      });
    });

    describe('when film isn`t present in DB', () => {
      beforeEach(() => {
        filmId = 1;

        filmRepositoryMock.deleteFilm.resolves(false);
      });

      it('should reject', () => {
        return expect(service.deleteFilm(filmId)).to.eventually.be.rejectedWith(
          NotFoundError,
        );
      });
    });
  });

  describe('createFilm', () => {
    let actualResult;
    beforeEach(async () => {
      actorRepositoryMock.findActors.resolves([
        {
          id: 1,
          ...filmActorsMock[1],
        },
      ]);

      actorRepositoryMock.create = sinon.stub((actorData) => actorData);

      actualResult = await service.createFilm(createFilmDtoMock);
    });

    it('should call repository createFilm method with correct actors array', () => {
      expect(filmRepositoryMock.createFilm).to.have.been.calledWith(
        createFilmDtoMock,
        [
          filmActorsMock[0],
          {
            id: 1,
            ...filmActorsMock[1],
          },
        ],
      );
    });

    it('should return createdFilm', () => {
      expect(actualResult).to.be.equal('createdFilm');
    });
  });

  describe('createManyFilms', () => {
    beforeEach(async () => {
      filmRepositoryMock.createManyFilms.resolves([2, undefined, 3]);
      actorRepositoryMock.getOrCreateMany = sinon.spy((actors) =>
        mapToActors(actors),
      );

      await service.createManyFilms(createManyFilmsMock);
    });

    it('should insert in DB / get from DB all unique actors that played in inserted films', () => {
      expect(actorRepositoryMock.getOrCreateMany).to.have.been.calledWith([
        {
          firstName: 'name1',
          lastName: 'lastName1',
        },
        {
          firstName: 'name2',
          lastName: 'lastName2',
        },
        {
          firstName: 'name4',
          lastName: 'lastName4',
        },
      ]);
    });

    it('should attach stars to each inserted film', () => {
      expect(filmRepositoryMock.addStars).to.have.been.calledWith(2, [
        sinon.match({
          firstName: 'name1',
          lastName: 'lastName1',
        }),
        sinon.match({
          firstName: 'name2',
          lastName: 'lastName2',
        }),
      ]);

      expect(filmRepositoryMock.addStars).to.have.been.calledWithMatch(3, [
        sinon.match({
          firstName: 'name2',
          lastName: 'lastName2',
        }),
        sinon.match({
          firstName: 'name4',
          lastName: 'lastName4',
        }),
      ]);
    });

    it('should resolve with number of newly created films', () => {});
  });
});
