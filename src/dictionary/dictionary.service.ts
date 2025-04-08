import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { DictionaryEntity } from './entities/dictionary.entity'

@Injectable()
export class DictionaryService {
  private readonly apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en'

  constructor(private readonly httpService: HttpService) { }

  async getPronunciation(word: string): Promise<DictionaryEntity[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<DictionaryEntity[]>(`${this.apiUrl}/${word}`),
      );

      return response.data
    } catch (error) {
      throw new HttpException(
        'Word not found or API error',
        HttpStatus.NOT_FOUND,
      )
    }
  }

  async getPhoneticText(word: string): Promise<string> {
    try {
      const entries = await this.getPronunciation(word)
      const entry = entries[0]

      if (!entry) return ''
      
      if (entry.phonetic) return entry.phonetic

      const phoneticText = entry.phonetics.find(p => p.text)?.text

      return phoneticText || ''
    } catch (error) {
      return ''
    }
  }
}
