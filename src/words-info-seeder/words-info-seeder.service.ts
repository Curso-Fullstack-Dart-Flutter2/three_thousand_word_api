import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { WordsInfoService } from 'src/words-info/words-info.service'

@Injectable()
export class WordsInfoSeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wordsInfoService: WordsInfoService,
  ) {}

  private readonly CHUNK_SIZE = 10
  private readonly RETRIES = 3
  private readonly DELAY_MS = 1000

  private async withRetry<T>(fn: () => Promise<T>, retries = this.RETRIES, delayMs = this.DELAY_MS): Promise<T> {
    let attempts = 0
    while (attempts < retries) {
      try {
        return await fn()
      } catch (err) {
        attempts++
        if (attempts >= retries) throw err
        await new Promise(res => setTimeout(res, delayMs * attempts))
      }
    }
    throw new Error('Unexpected retry failure')
  }

  async seedWordsInfo() {
    const allWords = await this.wordsInfoService.getWordsOnly()
    const total = allWords.length

    let totalInseridos = 0
    const erros: { palavra: string; motivo: string }[] = []

    for (let i = 0; i < total; i += this.CHUNK_SIZE) {
      const chunk = allWords.slice(i, i + this.CHUNK_SIZE)

      const wordInfos = await Promise.allSettled(
        chunk.map(async (wordObj) => {
          try {
            const info = await this.withRetry(() => this.wordsInfoService.getWordInfo(wordObj.word))
            return info
          } catch (error) {
            erros.push({ palavra: wordObj.word, motivo: error.message || 'Erro desconhecido' })
            return null
          }
        }),
      )

      const validInfos = wordInfos
        .filter(r => r.status === 'fulfilled' && r.value)
        .map((r: any) => r.value)

      if (validInfos.length > 0) {
        await (this.prisma.wordInfo.createMany as any)({
          data: validInfos.map(({ palavra, traducao, pronuncia }) => ({
            palavra,
            traducao,
            pronuncia,
          })),
        })

        totalInseridos += validInfos.length
        console.log(`✅ Inseridos: ${totalInseridos}/${total}`)
      }
    }

    return {
      message: 'Banco populado com sucesso!',
      totalInseridos,
      totalErros: erros.length,
      palavrasComErro: erros,
    }
  }
}
