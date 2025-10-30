import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common'
import { ApiKeyGuard } from '../common/guards/api-key.guard'
import { WordsInfoService } from './words-info.service'

@Controller('words-info')
@UseGuards(ApiKeyGuard)
export class WordsInfoController {
  constructor(private readonly wordsInfoService: WordsInfoService) { }

  @Get()
  async getWordsInfo(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return await this.wordsInfoService.getWordsInfoPaginated(+page, +limit)
  }
}
