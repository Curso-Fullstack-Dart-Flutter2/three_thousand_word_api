import { Controller, Get, Query } from '@nestjs/common'
import { WordsInfoService } from './words-info.service'

@Controller('words-info')
export class WordsInfoController {
  constructor(private readonly wordsInfoService: WordsInfoService) { }

  @Get()
  async getWordsInfo(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return await this.wordsInfoService.getWordsInfoPaginated(+page, +limit)
  }
}
