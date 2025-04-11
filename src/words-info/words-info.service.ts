import { Injectable } from '@nestjs/common'

import { WordsService } from 'src/words/words.service'
import { DictionaryService } from 'src/dictionary/dictionary.service'
import { TranslateService } from 'src/translate/translate.service'

@Injectable()
export class WordsInfoService {
  constructor(
    private readonly wordsService: WordsService,
    private readonly dictionaryService: DictionaryService,
    private readonly translateService: TranslateService,
  ) { }

  async getWordInfo(word: string): Promise<{ palavra: string; traducao: string; pronuncia: string }> {
    const [translateResponse, dictionaryResponse] = await Promise.all([
      this.translateService.translateText(word, 'PT'),
      this.dictionaryService.getPhoneticText(word),
    ])

    const traducao = translateResponse
    const pronuncia = dictionaryResponse

    return {
      palavra: word,
      traducao,
      pronuncia,
    }
  }

  async getWordsOnly(): Promise<{ word: string }[]> {
    return this.wordsService.getWords()
  }
}
