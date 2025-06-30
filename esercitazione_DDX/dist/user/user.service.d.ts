import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JsonValue } from '@prisma/client/runtime/library';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findUserById(userId: number): Promise<{
        username: string;
        refreshToken: string | null;
        id: number;
        hash: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(userId: number, dto: UpdateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<void>;
    getItemsCount(userId: number): Promise<JsonValue>;
}
