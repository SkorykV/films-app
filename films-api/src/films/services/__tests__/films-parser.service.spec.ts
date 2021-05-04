import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { InputError } from 'src/shared/types/errors.types';
import { FilmsParserService } from '../films-parser.service';
import {
  filmsFileContentMock,
  filmsParsingResult,
  filmWithMissingFieldFileMock,
  wrongFieldValueFileMock,
} from '../__mocks__/films-parser.service.mock';

describe('FilmsParserService', () => {
  let service: FilmsParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsParserService],
    }).compile();

    service = module.get<FilmsParserService>(FilmsParserService);
  });

  it('should be defined', () => {
    expect(service).to.be.not.undefined;
  });

  describe('parseFilmsFromBuffer', () => {
    it('should return parsed films objects if data is correctly formatted', async () => {
      const correctDataBuffer = Buffer.from(filmsFileContentMock);

      const actualResult = await service.parseFilmsFromBuffer(
        correctDataBuffer,
      );

      expect(actualResult).to.deep.equal(filmsParsingResult);
    });

    it('should reject if some film misses any of required filds', () => {
      const incorrectDataBuffer = Buffer.from(filmWithMissingFieldFileMock);

      return expect(
        service.parseFilmsFromBuffer(incorrectDataBuffer),
      ).to.eventually.be.rejectedWith(InputError);
    });

    it('should reject if some film has incorrect field', () => {
      const incorrectDataBuffer = Buffer.from(wrongFieldValueFileMock);

      return expect(
        service.parseFilmsFromBuffer(incorrectDataBuffer),
      ).to.eventually.be.rejectedWith(InputError);
    });
  });
});
