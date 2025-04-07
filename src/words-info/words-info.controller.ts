import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { WordsInfoService } from './words-info.service'
import { CreateWordsInfoDto } from './dto/create-words-info.dto'
import { UpdateWordsInfoDto } from './dto/update-words-info.dto'

@Controller('words-info')
export class WordsInfoController {
  constructor(private readonly wordsInfoService: WordsInfoService) {}

  @Post()
  create(@Body() createWordsInfoDto: CreateWordsInfoDto) {
    return this.wordsInfoService.create(createWordsInfoDto)
  }

  @Get()
  findAll() {
    return this.wordsInfoService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordsInfoService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordsInfoDto: UpdateWordsInfoDto) {
    return this.wordsInfoService.update(+id, updateWordsInfoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsInfoService.remove(+id)
  }
}
