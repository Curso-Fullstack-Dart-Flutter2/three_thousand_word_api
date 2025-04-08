import { Test, TestingModule } from '@nestjs/testing';
import { WordsInfoSeederController } from './words-info-seeder.controller';
import { WordsInfoSeederService } from './words-info-seeder.service';

describe('WordsInfoSeederController', () => {
  let controller: WordsInfoSeederController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsInfoSeederController],
      providers: [WordsInfoSeederService],
    }).compile();

    controller = module.get<WordsInfoSeederController>(WordsInfoSeederController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
