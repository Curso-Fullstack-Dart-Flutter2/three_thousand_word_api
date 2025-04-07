import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule, { cors: true })
  await app.listen(port)
  console.log(`🚀 Server rodando em http://localhost:${port}`)
}
bootstrap()

// npx prisma migrate dev
// npm run start:dev
// nest g pr usuario/usuario.repository --flat --no-spec
// nest g resource temp
