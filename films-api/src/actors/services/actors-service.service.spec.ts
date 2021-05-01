import { Test, TestingModule } from '@nestjs/testing';
import { ActorsServiceService } from './actors-service.service';

describe('ActorsServiceService', () => {
  let service: ActorsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActorsServiceService],
    }).compile();

    service = module.get<ActorsServiceService>(ActorsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
