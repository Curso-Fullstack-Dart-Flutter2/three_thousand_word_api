import { Controller, Get, Param } from '@nestjs/common'
import { TranslateService } from './translate.service'

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get(':word')
  findOne(@Param('word') word: string) {
    return this.translateService.findOne(word)
  }
}
