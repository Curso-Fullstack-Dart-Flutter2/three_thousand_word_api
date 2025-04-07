import { Test, TestingModule } from '@nestjs/testing'
import { WordsInfoService } from './words-info.service'

describe('WordsInfoService', () => {
  let service: WordsInfoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsInfoService],
    }).compile()

    service = module.get<WordsInfoService>(WordsInfoService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
})
