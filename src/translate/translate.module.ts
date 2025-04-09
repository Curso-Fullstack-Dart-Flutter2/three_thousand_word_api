import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TranslateService } from './translate.service'
import { TranslateController } from './translate.controller'

@Module({
  imports: [HttpModule],
  controllers: [TranslateController],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {}
