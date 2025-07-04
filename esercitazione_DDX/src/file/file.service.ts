import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileDto } from './dto/file.dto';
import { User } from '@prisma/client';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable({})
export class FileService {
  constructor(private prisma: PrismaService) { }

  async saveFile(file: Express.Multer.File, dto: FileDto, user: User) {
    try {
      if (dto.parentId != null && dto.parentId !== '') {
        const parentId = parseInt(dto.parentId);
        if (isNaN(parentId)) {
          throw new ForbiddenException(
            'Parent ID deve essere un numero valido',
          );
        }

        const parentExists = await this.prisma.item.findUnique({
          where: { id: parentId },
        });

        if (!parentExists) {
          throw new NotFoundException(`Parent con ID ${parentId} non trovato`);
        }

        // Verifica che l'utente sia proprietario del parent
        if (parentExists.ownerId !== user.id) {
          throw new ForbiddenException(
            'Non hai i permessi per utilizzare questo parent',
          );
        }
      }

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
      return file;
    } catch (error) {
      if (error) {
        throw error;
      }
      throw new Error('File not Found');
    }
  }

  async getFilesByIds(fileIds: string[], user: User) {

    if (fileIds.length > 0) {
      const numericIds = fileIds.map(id => Number(id));
      try {
        const files = await this.prisma.file.findMany({
          where: {
            id: { in: numericIds },
            item: {
              ownerId: user.id,
            },
          },
        });

        if (!files || files.length === 0) {
          throw new NotFoundException('Nessun file trovato per gli ID forniti');
        }
        return files;

      } catch (error) {
        throw error;
      }

    }

  }

  async updateFile(id: string, dto: FileDto, user: User) {
    const parentId = parseInt(dto.parentId);

    if (parentId) {
      const parentExists = await this.prisma.item.findUnique({
        where: { id: parentId },
      });

      if (!parentExists) {
        throw new NotFoundException(`Parent con ID ${parentId} non trovato`);
      }

      // Verifica che l'utente sia proprietario del parent
      if (parentExists.ownerId !== user.id) {
        throw new ForbiddenException(
          'Non hai i permessi per utilizzare questo parent',
        );
      }
    }

    try {
      const file = await this.prisma.file.findUnique({
        where: { id: parseInt(id) },
      });

      if (!file) {
        throw new NotFoundException('File not found');
      }

      const fileUpdated = await this.prisma.file.update({
        where: { id: parseInt(id) },
        data: {
          fileName: dto.name,
          updatedAt: new Date(),
        },
      });

      const item = await this.prisma.item.update({
        where: { id: file.itemId },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(parentId && {
            parent: { connect: { id: parentId } },
          }),
          updatedAt: new Date(),
        },
      });

      return {
        message: 'Item updated successfully',
        item,
        fileUpdated,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(id: string, user: User) {
    try {
      const file = await this.prisma.file.findUnique({
        where: { id: parseInt(id) },
      });
      if (!file) throw new Error('File not found');

      await this.prisma.file.delete({
        where: { id: parseInt(id) },
      });

      await this.prisma.item.delete({
        where: { id: file.itemId, ownerId: user.id },
      });

      return {
        message: 'File deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
