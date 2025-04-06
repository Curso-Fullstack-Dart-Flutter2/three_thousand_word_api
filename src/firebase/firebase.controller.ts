import { Controller, Get } from '@nestjs/common'
import { FirebaseAdminService } from './firebase-admin.service'

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) { }

  @Get('remote-config')
  async getRemoteConfig() {
    const remoteConfig = this.firebaseAdminService.getRemoteConfig();
    const template = await remoteConfig.getTemplate()

    return template.parameters
  }

  @Get('api-key')
  async getApiKey() {
    console.log('chamou o controller')
    const apiKey = await this.firebaseAdminService.getApiKey();
    return { apiKey };
  }
}
