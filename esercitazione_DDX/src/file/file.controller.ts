import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { FileService } from "./file.service";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { FileDto } from "./dto/file.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";

@UseGuards(JwtGuard)
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) { }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: FileDto, @GetUser() user: User) {
        return this.fileService.saveFile(file, dto, user);
    }

}