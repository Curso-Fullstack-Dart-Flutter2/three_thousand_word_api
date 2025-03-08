import { Body, Controller, Post } from '@nestjs/common'
import Usuario from './usuario.entity'
import { UsuarioRepository } from './usuario.repository'

@Controller('usuario')
export class UsuarioController {
    constructor(private repo: UsuarioRepository) { }

    @Post()
    async criar(@Body() usuario: Usuario) {
        const novoUsuario = await this.repo.criar(usuario)
        return novoUsuario
    }
}
