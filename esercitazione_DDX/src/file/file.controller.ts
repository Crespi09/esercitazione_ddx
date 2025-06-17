import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { FileService } from './file.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { FileDto } from './dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: FileDto,
    @GetUser() user: User,
  ) {
    return this.fileService.saveFile(file, dto, user);
  }

  @Get('')
  getFile(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'uploads/file-1750083835469-112574999.webp'));
    file.pipe(res);
  }

}
