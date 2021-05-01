import { Test, TestingModule } from '@nestjs/testing';
import { FilmsParserService } from '../films-parser.service';

describe('FilmsParserService', () => {
  let service: FilmsParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsParserService],
    }).compile();

    service = module.get<FilmsParserService>(FilmsParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
