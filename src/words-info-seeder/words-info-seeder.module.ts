import { Module } from '@nestjs/common'
import { WordsInfoSeederService } from './words-info-seeder.service'
import { WordsInfoSeederController } from './words-info-seeder.controller'
import { DbModule } from 'src/db/db.module'
import { WordsInfoModule } from 'src/words-info/words-info.module'

@Module({
  imports: [DbModule, WordsInfoModule],
  controllers: [WordsInfoSeederController],
  providers: [WordsInfoSeederService],
})
export class WordsInfoSeederModule { }
