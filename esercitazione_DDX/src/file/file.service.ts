import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileDto } from './dto/file.dto';
import { User } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable({})
export class FileService {
  constructor(private prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File, dto: FileDto, user: User) {
    try {
      const itemObj = await this.prisma.item.create({
        data: {
          name: file.originalname,
          ...(dto.parentId
            ? {
                parent: {
                  connect: {
                    id: parseInt(dto.parentId)
                      ? parseInt(dto.parentId)
                      : undefined,
                  },
                },
              }
            : {}),
          owner: { connect: { id: user.id } },

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const fileObj = await this.prisma.file.create({
        data: {
          fileType: file.mimetype,
          fileName: file.originalname,
          storage: file.size,
          path: file.path,
          item: {
            connect: { id: itemObj.id },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return {
        message: 'File uploaded successfully',
        item: itemObj,
        file: fileObj,
        user: user.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async getFileById(id: string) {
    try {
      const file = await this.prisma.file.findUnique({
        where: { id: parseInt(id) },
      });
      return file.path;
    } catch (error) {
      if (error) {
        throw error;
      }
      throw new Error('File not Found');
    }
  }
}
