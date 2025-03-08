import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { DictionaryEntity } from './entities/dictionary.entity';

@Injectable()
export class DictionaryService {
  private readonly apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en'

  constructor(private readonly httpService: HttpService) { }

  async getWord(word: string): Promise<DictionaryEntity[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<DictionaryEntity[]>(`${this.apiUrl}/${word}`),
      );

      return response.data
    } catch (error) {
      throw new HttpException(
        'Word not found or API error',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
