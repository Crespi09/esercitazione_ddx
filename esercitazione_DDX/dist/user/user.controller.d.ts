import { User } from "@prisma/client";
export declare class UserController {
    getMe(user: User): {
        email: string;
        hash: string;
        username: string | null;
        userRefreshToken: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    };
    ediUser(): void;
}
