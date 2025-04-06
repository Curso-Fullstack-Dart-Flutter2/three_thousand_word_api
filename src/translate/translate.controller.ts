import { Controller, Get, Param } from '@nestjs/common'
import { TranslateService } from './translate.service'

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get(':word')
  getWordTranslate(@Param('word') word: string) {
    return this.translateService.getWordTranslate(word, 'PT-BR')
  }
}
