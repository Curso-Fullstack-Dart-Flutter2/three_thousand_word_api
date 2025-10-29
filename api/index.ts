import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { Server } from 'http';

const expressApp = express();
let server: Server;

export default async function handler(req: Request, res: Response) {
  try {
    // Inicializa o servidor apenas uma vez (a cada "cold start" da função)
    if (!server) {
      console.log('🌀 Inicializando NestJS na Vercel (primeira execução)...');
      const adapter = new ExpressAdapter(expressApp);
      const app = await NestFactory.create(AppModule, adapter, {
        logger: ['error', 'warn', 'log'], // habilita logs do Nest
      });

      await app.init();
      server = expressApp.listen();
      console.log('✅ NestJS inicializado com sucesso!');
    }

    // Repassa a requisição para o Express (que o Nest controla)
    expressApp(req, res);
  } catch (err) {
    console.error('❌ Erro ao lidar com requisição no handler Vercel:', err);
    res.status(500).json({ error: 'Erro interno no servidor', details: err.message });
  }
}
