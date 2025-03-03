import { Controller, Get } from '@nestjs/common'

@Controller('produtos')
export class ProdutoController {
    @Get('/ping')
    ping(): string {
        return 'Pong'
    }
}
