import { Test, TestingModule } from '@nestjs/testing';
import { WordsInfoSeederService } from './words-info-seeder.service';

describe('WordsInfoSeederService', () => {
  let service: WordsInfoSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsInfoSeederService],
    }).compile();

    service = module.get<WordsInfoSeederService>(WordsInfoSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
