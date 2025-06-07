import { User } from "@prisma/client";
export declare class UserController {
    getMe(user: User): {
        username: string;
        refreshToken: string | null;
        id: number;
        hash: string;
        createdAt: Date;
        updatedAt: Date;
    };
    updateUser(user: User): void;
}
