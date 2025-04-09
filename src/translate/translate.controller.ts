import { Controller, Get, Param } from '@nestjs/common'
import { TranslateService } from './translate.service'

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get(':word')
  async getWordTranslate(@Param('word') word: string): Promise<string> {
    return await this.translateService.translateText(word, 'PT-BR')
  }
}
