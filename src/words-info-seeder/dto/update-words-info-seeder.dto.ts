import { PartialType } from '@nestjs/mapped-types';
import { CreateWordsInfoSeederDto } from './create-words-info-seeder.dto';

export class UpdateWordsInfoSeederDto extends PartialType(CreateWordsInfoSeederDto) {}
