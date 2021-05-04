import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { ActorsService } from '../actors.service';

describe('ActorsService', () => {
  let service: ActorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActorsService],
    }).compile();

    service = module.get<ActorsService>(ActorsService);
  });

  it('should be defined', () => {
    expect(service).to.be.not.undefined;
  });

  describe('buildActorsMap', () => {
    it('should return actors mapped by their names', () => {
      const actors = [
        {
          id: 1,
          firstName: 'Volodymyr',
          lastName: 'Test1',
          get fullName() {
            return `${this.firstName} ${this.lastName}`;
          },
        },
        {
          id: 2,
          firstName: 'Andrii',
          lastName: 'Test2',
          get fullName() {
            return `${this.firstName} ${this.lastName}`;
          },
        },
      ];
      const expectedResult = new Map(
        actors.map((actor) => [actor.fullName, actor]),
      );

      const actualResult = service.buildActorsMap(actors);

      expect(actualResult).to.deep.equal(new Map(expectedResult));
    });
  });
});
