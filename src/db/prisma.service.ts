import { Global, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        throw new Error('Method not implemented.');
    }

    async onModuleDestroy() {
        throw new Error('Method not implemented.');
    }
}
