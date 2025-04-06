import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { Translate } from './entities/translate.entity'

@Injectable()
export class TranslateService {
  private readonly apiUrl = 'https://api-free.deepl.com/v2/translate'
  private readonly apiKey = '***********'

  constructor(private readonly httpService: HttpService) { }

  async getWordTranslate(word: string, targetLang: string): Promise<any> {
    try {
      const response = await this.httpService.post<Translate>(
        this.apiUrl,
        new URLSearchParams({
          text: word,
          target_lang: targetLang,
        }),
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${this.apiKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      return firstValueFrom(response).then(res => res.data)
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Translation failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
