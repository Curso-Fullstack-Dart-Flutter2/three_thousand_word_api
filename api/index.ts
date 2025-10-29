import { NestFactory } from '@nestjs/core'
import { AppModule } from '../src/app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import express, { Request, Response } from 'express'
import { Server } from 'http'

const expressApp = express()
let server: Server

export default async function handler(req: Request, res: Response) {
  if (!server) {
    const adapter = new ExpressAdapter(expressApp)
    const app = await NestFactory.create(AppModule, adapter)
    await app.init()
    server = expressApp.listen() // apenas inicializa a instância, não abre porta
  }

  // Pega o "request handler" do Express e chama diretamente
  expressApp(req, res)
}
