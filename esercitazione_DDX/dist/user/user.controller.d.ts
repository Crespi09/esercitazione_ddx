import { User } from "@prisma/client";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: User): {
        username: string;
        refreshToken: string | null;
        id: number;
        hash: string;
        createdAt: Date;
        updatedAt: Date;
    };
    getUserItemsStats(user: User): Promise<import("@prisma/client/runtime/library").JsonValue>;
    updateUser(user: User): void;
}
