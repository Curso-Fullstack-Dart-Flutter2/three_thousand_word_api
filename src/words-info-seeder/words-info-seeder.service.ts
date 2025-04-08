import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { WordsInfoService } from 'src/words-info/words-info.service'

@Injectable()
export class WordsInfoSeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wordsInfoService: WordsInfoService,
  ) { }

  async seedWordsInfo() {
    const wordsInfo = await this.wordsInfoService.getWordsInfo();

    const created = await this.prisma.wordInfo.createMany({
      data: wordsInfo.map(({ palavra, traducao, pronuncia }) => ({
        palavra,
        traducao,
        pronuncia,
      })),
    })

    return {
      message: 'Bank successfully populated!',
      totalInseridos: created.count,
    }
  }
}
