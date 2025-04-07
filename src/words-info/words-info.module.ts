import { Module } from '@nestjs/common'
import { WordsInfoService } from './words-info.service'
import { WordsInfoController } from './words-info.controller'

@Module({
  controllers: [WordsInfoController],
  providers: [WordsInfoService],
})
export class WordsInfoModule {}
