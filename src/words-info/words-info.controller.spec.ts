import { Test, TestingModule } from '@nestjs/testing'
import { WordsInfoController } from './words-info.controller'
import { WordsInfoService } from './words-info.service'

describe('WordsInfoController', () => {
  let controller: WordsInfoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsInfoController],
      providers: [WordsInfoService],
    }).compile()

    controller = module.get<WordsInfoController>(WordsInfoController);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
