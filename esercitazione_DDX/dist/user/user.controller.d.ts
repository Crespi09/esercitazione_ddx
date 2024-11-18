import { User } from "@prisma/client";
export declare class UserController {
    getMe(user: User): {
        email: string;
        username: string | null;
        hash: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    };
    ediUser(): void;
}
