import { Module } from '@nestjs/common'
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

@Module({
  imports: [ProdutoModule, UsuarioModule, TempModule, DbModule, DictionaryModule, WordsModule, TranslateModule, FirebaseModule],
  controllers: [AppController, FirebaseController],
  providers: [AppService],
})
export class AppModule { }
