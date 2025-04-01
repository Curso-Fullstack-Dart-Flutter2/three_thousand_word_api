import { Injectable } from '@nestjs/common'

@Injectable()
export class TranslateService {
  findOne(word: string) {
    return `This action returns a #${word} translate`
  }
}
