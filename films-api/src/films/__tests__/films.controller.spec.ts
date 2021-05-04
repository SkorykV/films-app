import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { GetFilmsDTO } from '../dto/get-films.dto';
import { FilmsController } from '../films.controller';
import { FilmsParserService } from '../services/films-parser.service';
import { FilmsService } from '../services/films.service';
import { DB_SORT } from 'src/shared/types/db.types';
import { FILM_FORMAT } from '../types/film-format.enum';
import { CreateFilmWithActorsDTO } from '../dto/create-film-with-actors.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsServiceMock;
  let filmsParserServiceMock;

  beforeEach(async () => {
    filmsServiceMock = {
      getFilms: sinon.stub().resolves(['film1', 'film2']),
      getFilm: sinon.stub().resolves('filmMock'),
      deleteFilm: sinon.stub().resolves('deleteResult'),
      createFilm: sinon.stub().resolves('createdFilm'),
      createManyFilms: sinon.stub().resolves('createdFilmsCount'),
    };

    filmsParserServiceMock = {
      parseFilmsFromBuffer: sinon.stub().resolves('parsedFilmsDTOs'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        { provide: FilmsService, useValue: filmsServiceMock },
        { provide: FilmsParserService, useValue: filmsParserServiceMock },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).to.be.not.undefined;
  });

  describe('getFilms', () => {
    let filterDTO: GetFilmsDTO;
    let actualResult;
    beforeEach(async () => {
      filterDTO = {
        title: 'title query',
        actorName: 'actor query',
        sort: DB_SORT.ASC,
      };

      actualResult = await controller.getFilms(filterDTO);
    });

    it('should pass filterDTO to service', () => {
      expect(filmsServiceMock.getFilms).to.have.been.calledWith(filterDTO);
    });

    it('should resolve with result from the service', () => {
      expect(actualResult).to.deep.equal(['film1', 'film2']);
    });
  });

  describe('getFilm', () => {
    let filmId;
    let actualResult;
    beforeEach(async () => {
      filmId = 1;

      actualResult = await controller.getFilm(filmId);
    });

    it('should call service method with filmId', () => {
      expect(filmsServiceMock.getFilm).to.have.been.calledWith(filmId);
    });

    it('should resolve with result from the service', () => {
      expect(actualResult).to.equal('filmMock');
    });
  });

  describe('deleteFilm', () => {
    let filmId;
    let actualResult;
    beforeEach(async () => {
      filmId = 1;

      actualResult = await controller.deleteFilm(filmId);
    });

    it('should call service method with filmId', () => {
      expect(filmsServiceMock.deleteFilm).to.have.been.calledWith(filmId);
    });

    it('should resolve with result from the service', () => {
      expect(actualResult).to.equal('deleteResult');
    });
  });

  describe('createFilm', () => {
    let actualResult;
    let filmData: CreateFilmWithActorsDTO;
    beforeEach(async () => {
      filmData = {
        title: 'Test',
        releaseYear: 2020,
        format: FILM_FORMAT.BLURAY,
        stars: [],
      };

      actualResult = await controller.createFilm(filmData);
    });

    it('should call service with passed data', () => {
      expect(filmsServiceMock.createFilm).to.have.been.calledWith(filmData);
    });

    it('should resolve with result from the service', () => {
      expect(actualResult).to.equal('createdFilm');
    });
  });

  describe('createFilmsFromFile', () => {
    let actualResult;
    let fileMock: any;
    beforeEach(async () => {
      fileMock = {
        buffer: Buffer.alloc(10),
      };

      actualResult = await controller.createFilmsFromFile(fileMock);
    });

    it('should call parsing service with file data', () => {
      expect(
        filmsParserServiceMock.parseFilmsFromBuffer,
      ).to.have.been.calledWith(fileMock.buffer);
    });

    it('should call films service with parsed filmsDTOs', () => {
      expect(filmsServiceMock.createManyFilms).to.have.been.calledWith(
        'parsedFilmsDTOs',
      );
    });

    it('should resolve with number of created films received from films service', () => {
      expect(actualResult).to.deep.equal({ created: 'createdFilmsCount' });
    });
  });
});
