import { Injectable } from '@nestjs/common'
import { WordEntity } from './entities/word.entity'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class WordsService {
  private words: WordEntity[]

  constructor() {
    const filePath = path.resolve(process.cwd(), 'src', 'words', 'ttw_words', 'words.json')

    if (!fs.existsSync(filePath)) {
      throw new Error(`JSON file not found at ${filePath}`)
    }

    const fileData = fs.readFileSync(filePath, 'utf-8')
    this.words = JSON.parse(fileData)
  }

  getWords(): WordEntity[] {
    return this.words
  }
}
