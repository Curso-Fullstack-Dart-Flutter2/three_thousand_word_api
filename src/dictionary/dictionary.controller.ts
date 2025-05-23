import { Controller, Get, Param, NotFoundException } from '@nestjs/common'
import { DictionaryService } from './dictionary.service'
import { DictionaryEntity } from './entities/dictionary.entity'

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) { }

  @Get(':word')
  async getWord(@Param('word') word: string): Promise<string> {
    try {
      return await this.dictionaryService.getPhoneticText(word)
    } catch (error) {
      throw new NotFoundException('Word not found')
    }
  }
}
