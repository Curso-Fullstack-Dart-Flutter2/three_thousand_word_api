import { Controller, Get } from '@nestjs/common'
import { WordsService } from './words.service'
import { WordEntity } from './entities/word.entity'

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  getWords(): WordEntity[] {
    return this.wordsService.getWords()
  }
}
