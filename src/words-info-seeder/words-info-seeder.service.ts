import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { WordsInfoService } from 'src/words-info/words-info.service'
import * as fs from 'fs'
import * as path from 'path'
import csv from 'csv-parser'

@Injectable()
export class WordsInfoSeederService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wordsInfoService: WordsInfoService,
  ) { }

  private readonly CHUNK_SIZE = 50
  private readonly RETRIES = 3
  private readonly DELAY_MS = 500

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

  // Mantém o método antigo
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

  // Novo método para popular a partir de CSV (corrigido e mais robusto)
  async seedFromCsv(filename: string) {
    const filePath = path.resolve(__dirname, filename)
    console.log(`📂 Lendo CSV de: ${filePath}`)

    const buffer: { palavra: string; traducao: string; pronuncia?: string }[] = []
    let totalInseridos = 0
    const erros: { palavra: string; motivo: string }[] = []

    return new Promise<{ message: string; totalInseridos: number; totalErros: number; erros: any[] }>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(
          csv({
            separator: ',', // força separador vírgula
            skipLines: 0,
            mapHeaders: ({ header }) => header.trim().toLowerCase(), // normaliza cabeçalhos
          }),
        )
        .on('data', async (row) => {
          // Normaliza campos e remove espaços/aspas
          const palavra = row.palavra?.trim().replace(/^"|"$/g, '') || ''
          const traducao = row.traducao?.trim().replace(/^"|"$/g, '') || ''
          const pronuncia = row.pronuncia?.trim().replace(/^"|"$/g, '') || ''

          if (!palavra) return // ignora linha sem palavra

          buffer.push({ palavra, traducao, pronuncia })

          if (buffer.length >= this.CHUNK_SIZE) {
            this.processChunk(buffer.splice(0, buffer.length), erros)
              .then((count) => {
                totalInseridos += count
                console.log(`✅ Inseridos até agora: ${totalInseridos}`)
              })
              .catch((err) => reject(err))
          }
        })
        .on('end', async () => {
          if (buffer.length > 0) {
            const count = await this.processChunk(buffer, erros)
            totalInseridos += count
          }
          console.log(`🎯 Total inseridos: ${totalInseridos}`)
          if (erros.length) console.warn(`⚠️ Ocorreram ${erros.length} erros`)
          resolve({
            message: 'Banco populado a partir do CSV!',
            totalInseridos,
            totalErros: erros.length,
            erros,
          })
        })
        .on('error', (err) => reject(err))
    })
  }

  private async processChunk(
    chunk: { palavra: string; traducao: string; pronuncia?: string }[],
    erros: { palavra: string; motivo: string }[],
  ): Promise<number> {
    const results = await Promise.allSettled(
      chunk.map(async (row) => {
        try {
          return await this.withRetry(() =>
            this.prisma.wordInfo.create({
              data: { palavra: row.palavra, traducao: row.traducao, pronuncia: row.pronuncia || null },
            }),
          )
        } catch (err) {
          erros.push({ palavra: row.palavra, motivo: err.message || 'Erro desconhecido' })
          return null
        }
      }),
    )
    return results.filter(r => r.status === 'fulfilled' && r.value).length
  }
}
