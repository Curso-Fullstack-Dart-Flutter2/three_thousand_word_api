import { Module } from '@nestjs/common'
import { WordsInfoService } from './words-info.service'
import { WordsInfoController } from './words-info.controller'
import { WordsModule } from 'src/words/words.module'
import { DictionaryModule } from 'src/dictionary/dictionary.module'
import { TranslateModule } from 'src/translate/translate.module'
import { DbModule } from 'src/db/db.module'

@Module({
  imports: [WordsModule, DictionaryModule, TranslateModule, DbModule],
  controllers: [WordsInfoController],
  providers: [WordsInfoService],
  exports: [WordsInfoService],
})
export class WordsInfoModule {}
