import { PartialType } from '@nestjs/mapped-types'
import { CreateWordsInfoDto } from './create-words-info.dto'

export class UpdateWordsInfoDto extends PartialType(CreateWordsInfoDto) {}
