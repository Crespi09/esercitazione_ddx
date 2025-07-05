import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
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
import { get } from 'http';

@UseGuards(JwtGuard)
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) { }

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
  async getFilesByIds(@Query('ids') ids: string, @GetUser() user: User) {
    const fileIds = ids.split(',').map(id => id.trim());
    return this.fileService.getFilesByIds(fileIds, user);
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    const fileData = await this.fileService.getFileById(id);
    
    res.setHeader('Content-Type', fileData.fileType);

    const file = createReadStream(fileData.path);
    file.pipe(res);

    return file;
  }

  // passo id del file
  @Put(':id')
  updateFile(
    @Param('id') id: string, @Body() dto: FileDto, @GetUser() user: User,
  ) {
    return this.fileService.updateFile(id, dto, user);
  }

  @Delete(':id')
  deleteFile(@Param('id') id: string, @GetUser() user: User) {
    return this.fileService.deleteFile(id, user);
  }

}
