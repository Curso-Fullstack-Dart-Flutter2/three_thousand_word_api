import { Module } from '@nestjs/common'
import { WordsInfoService } from './words-info.service'
import { WordsInfoController } from './words-info.controller'
import { WordsModule } from 'src/words/words.module'
import { DictionaryModule } from 'src/dictionary/dictionary.module'
import { TranslateModule } from 'src/translate/translate.module'

@Module({
  imports: [WordsModule, DictionaryModule, TranslateModule],
  controllers: [WordsInfoController],
  providers: [WordsInfoService],
  exports: [WordsInfoService],
})
export class WordsInfoModule {}
