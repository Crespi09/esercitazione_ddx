import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findUserById(userId: number): Promise<User>;
    updateUser(userId: number, dto: UpdateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<void>;
}
