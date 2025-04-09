import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DbModule {
  constructor(private readonly prisma: PrismaService) {
    console.log('DbModule initialized')
    
    this.prisma.$connect().catch((error) => {
      console.error('Failed to connect to the database:', error)
    })
  }
}
