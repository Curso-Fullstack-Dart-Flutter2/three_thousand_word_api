import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Client } from 'pg'

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule, { cors: true })

  async function testSupabaseConnection() {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
  
    try {
      console.log('🧪 Testando conexão com o Supabase...');
      await client.connect();
      console.log('✅ Conexão com Supabase bem-sucedida!');
      await client.end();
    } catch (error) {
      console.error('❌ Falha ao conectar ao Supabase:');
      console.error(error);
    }
  }
  
  testSupabaseConnection();


  await app.listen(port)
  console.log(`🚀 Server is running on http://localhost:${port} port`)
}
bootstrap()

// npx prisma migrate dev
// npm run start:dev
// nest g pr usuario/usuario.repository --flat --no-spec
// nest g resource temp
