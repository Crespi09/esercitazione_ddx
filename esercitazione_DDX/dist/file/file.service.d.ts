import { PrismaService } from "src/prisma/prisma.service";
import { FileDto } from "./dto/file.dto";
import { User } from "@prisma/client";
export declare class FileService {
    private prisma;
    constructor(prisma: PrismaService);
    saveFile(file: Express.Multer.File, dto: FileDto, user: User): {
        message: string;
        filename: string;
        user: number;
    };
}
