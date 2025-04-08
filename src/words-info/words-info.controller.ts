import { Controller, Get } from '@nestjs/common'
import { WordsInfoService } from './words-info.service'

@Controller('words-info')
export class WordsInfoController {
  constructor(private readonly wordsInfoService: WordsInfoService) {}

  @Get()
  async getWordsInfo() {
    return await this.wordsInfoService.getWordsInfo()
  }
}
