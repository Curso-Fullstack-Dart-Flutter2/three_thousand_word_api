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
  ) {}

  async getWordsInfo() {
    const words = this.wordsService.getWords() // [{ word: "apple" }, ...]

    const wordsInfo = await Promise.all(
      words.map(async ({ word }) => {
        let traducao = ''
        let pronuncia = ''

        try {
          const translation = await this.translateService.translateWord(word, 'PT')
          traducao = translation.translations?.[0]?.text || ''
        } catch (err) {
          traducao = ''
        }

        try {
          const dictionary = await this.dictionaryService.getPronunciation(word)
          pronuncia = dictionary?.[0]?.phonetic || dictionary?.[0]?.phonetics?.[0]?.text || ''
        } catch (err) {
          pronuncia = ''
        }

        return {
          palavra: word,
          traducao,
          pronuncia,
        }
      }),
    )

    return wordsInfo
  }
}
