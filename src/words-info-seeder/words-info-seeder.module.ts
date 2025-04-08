import { Module } from '@nestjs/common'
import { WordsInfoSeederService } from './words-info-seeder.service'
import { WordsInfoSeederController } from './words-info-seeder.controller'

@Module({
  controllers: [WordsInfoSeederController],
  providers: [WordsInfoSeederService],
})
export class WordsInfoSeederModule {}
