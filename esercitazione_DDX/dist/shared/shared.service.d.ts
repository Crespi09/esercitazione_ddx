import { HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { ShareDto } from './dto/share.dto';
export declare class SharedService {
    private prisma;
    constructor(prisma: PrismaService);
    addShareItem(dto: ShareDto, user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        itemId: number;
        sharedWithId: number;
    }>;
    removeShareItem(sharedId: string, user: User): Promise<HttpStatus>;
}
