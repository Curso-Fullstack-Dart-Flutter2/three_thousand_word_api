import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly type: 'public' | 'admin' = 'public') {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    const expectedKey =
      this.type === 'admin' ? process.env.ADMIN_API_KEY : process.env.API_KEY

    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid or missing API key')
    }

    return true
  }
}
