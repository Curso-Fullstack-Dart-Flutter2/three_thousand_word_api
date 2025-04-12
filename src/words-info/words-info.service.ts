import { Injectable } from '@nestjs/common'

import { WordsService } from 'src/words/words.service'
import { DictionaryService } from 'src/dictionary/dictionary.service'
import { TranslateService } from 'src/translate/translate.service'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class WordsInfoService {
  constructor(
    private readonly wordsService: WordsService,
    private readonly dictionaryService: DictionaryService,
    private readonly translateService: TranslateService,
    private readonly prisma: PrismaService,
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

  async getWordsInfo() {
    return this.prisma.wordInfo.findMany({
      orderBy: { palavra: 'asc' },
    })
  }

  async getWordsInfoPaginated(page = 1, limit = 20) {
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      this.prisma.wordInfo.findMany({
        skip,
        take: limit,
        orderBy: { palavra: 'asc' },
      }),

      this.prisma.wordInfo.count(),
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      data,
      meta: {
        total,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    }
  }
}
