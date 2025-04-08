import { Controller, Post } from '@nestjs/common'
import { WordsInfoSeederService } from './words-info-seeder.service'

@Controller('words-info-seeder')
export class WordsInfoSeederController {
  constructor(private readonly wordsInfoSeederService: WordsInfoSeederService) {}

  @Post('populate')
  async populate() {
    return this.wordsInfoSeederService.seedWordsInfo()
  }
}
