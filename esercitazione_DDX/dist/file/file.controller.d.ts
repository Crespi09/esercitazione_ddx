import { FileService } from "./file.service";
import { User } from "@prisma/client";
import { FileDto } from "./dto/file.dto";
export declare class FileController {
    private fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File, dto: FileDto, user: User): {
        message: string;
        filename: string;
        user: number;
    };
}
