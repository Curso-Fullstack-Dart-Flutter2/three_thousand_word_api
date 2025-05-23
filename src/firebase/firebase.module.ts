import { Module } from '@nestjs/common'
import { FirebaseAdminService } from './firebase-admin.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService],
})
export class FirebaseModule {}
