import { Controller, Post, UseGuards } from '@nestjs/common'
import { WordsInfoSeederService } from './words-info-seeder.service'
import { ApiKeyGuard } from '../common/guards/api-key.guard'

@Controller('words-info-seeder')
export class WordsInfoSeederController {
  constructor(private readonly wordsInfoSeederService: WordsInfoSeederService) {}

  @Post('populate')
  @UseGuards(new ApiKeyGuard('admin'))
  async populate() {
    return this.wordsInfoSeederService.seedWordsInfo()
  }
}
