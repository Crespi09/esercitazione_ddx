import { User } from "@prisma/client";
export declare class UserController {
    getMe(user: User): {
        username: string;
        refreshToken: string | null;
        hash: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    };
}
