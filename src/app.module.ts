import { Module } from '@nestjs/common'
import { ProdutoModule } from './produto/produto.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuarioModule } from './usuario/usuario.module'
import { TempModule } from './temp/temp.module'
import { DbModule } from './db/db.module'
import { DictionaryModule } from './dictionary/dictionary.module'
import { WordsModule } from './words/words.module';

@Module({
  imports: [ProdutoModule, UsuarioModule, TempModule, DbModule, DictionaryModule, WordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
