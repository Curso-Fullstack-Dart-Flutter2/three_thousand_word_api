import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

import { ProdutoModule } from './produto/produto.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuarioModule } from './usuario/usuario.module'
import { TempModule } from './temp/temp.module'
import { DbModule } from './db/db.module'
import { DictionaryModule } from './dictionary/dictionary.module'
import { WordsModule } from './words/words.module'
import { TranslateModule } from './translate/translate.module'
import { FirebaseModule } from './firebase/firebase.module'
import { FirebaseController } from './firebase/firebase.controller'
import { WordsInfoModule } from './words-info/words-info.module'
import { WordsInfoSeederModule } from './words-info-seeder/words-info-seeder.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ProdutoModule, 
    UsuarioModule, 
    TempModule, 
    DbModule, 
    DictionaryModule, 
    WordsModule, 
    TranslateModule, 
    FirebaseModule, 
    WordsInfoModule, 
    WordsInfoSeederModule
  ],
  controllers: [AppController, FirebaseController],
  providers: [AppService],
})
export class AppModule { }
