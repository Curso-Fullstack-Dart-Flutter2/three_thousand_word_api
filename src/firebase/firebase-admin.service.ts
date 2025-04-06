import { Injectable, OnModuleInit } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  constructor(private configService: ConfigService) { }

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
        }),
      })
    }
  }

  getRemoteConfig() {
    return admin.remoteConfig()
  }

  async getApiKey(): Promise<string> {
    console.log('chamou o firebase-admin.service.ts')
    const remoteConfig = this.getRemoteConfig()
    const template = await remoteConfig.getTemplate()

    const param = template.parameters['translate_api_key']

    if (!param || !param.defaultValue || !('value' in param.defaultValue)) {
      throw new Error('API_KEY não encontrada no Firebase Remote Config')
    }

    const apiKey = param.defaultValue.value

    return apiKey
  }
}
