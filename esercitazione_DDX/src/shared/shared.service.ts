import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ShareDto } from './dto/share.dto';

@Injectable({})
export class SharedService {
  constructor(private prisma: PrismaService) { }


  async addShareItem(dto: ShareDto, user: User) {

    if (!dto.item_id || !dto.shared_with_id) {
      throw new ForbiddenException('item_id e shared_with_id sono obbligatori');
    }

    try {

      const itemId = parseInt(dto.item_id);
      if (isNaN(itemId)) {
        throw new ForbiddenException('item_id deve essere un numero valido');
      }

      const itemExists = await this.prisma.item.findUnique({
        where: { id: itemId },
      });

      if (!itemExists) {
        throw new NotFoundException(`Item con ID ${itemId} non trovato`);
      }

      // Verifica che l'utente sia proprietario dell'item
      if (itemExists.ownerId !== user.id) {
        throw new ForbiddenException('Non hai i permessi per condividere questo item');
      }

      const sharedWithId = parseInt(dto.shared_with_id);
      if (isNaN(sharedWithId)) {
        throw new ForbiddenException('shared_with_id deve essere un numero valido');
      }

      const share = await this.prisma.shared.create({
        data: {
          item: { connect: { id: itemId } },
          sharedWith: { connect: { id: sharedWithId } },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // return share;

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Condivisione già esistente');
        }
      }
      throw error;
    }

  }

  async removeShareItem(sharedId: string, user: User) {
    const shared = await this.prisma.shared.findUnique({
      where: { id: parseInt(sharedId) }
    });

    if (!shared) {
      throw new NotFoundException('Condivisione non trovata');
    }

    const item = await this.prisma.item.findUnique({
      where: { id: shared.itemId }
    });

    if (shared.sharedWithId !== user.id && item.ownerId !== user.id) {
      throw new ForbiddenException('Non hai i permessi per rimuovere questa condivisione');
    }

    await this.prisma.shared.delete({
      where: { id: parseInt(sharedId) }
    });

    return HttpStatus.NO_CONTENT;

  }

  async allItemsShared(limit: number, offset: number, user: User) {
    if (limit === undefined || limit === null || offset === undefined || offset === null) {
      throw new ForbiddenException('Limit and offset are required');
    }

    if (limit <= 0) {
      throw new ForbiddenException('Limit must be greater than 0');
    }

    if (offset < 0) {
      throw new ForbiddenException('Offset must be greater than or equal to 0');
    }


    /*

      andare a prendere tutti gli item condivisi con l'utente in base al limit e offset

      dividerli in due array differenti se sono folder o file, per vedere se sono file  comparo l'id di ogni item
      con file.itemId
      
      folder
      - f1
      - f2
      - f3

      file 
      -file1
      -file2
      -file3
    */

    try {

      const itemsShared = await this.prisma.shared.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        where: {
          sharedWithId: user.id,
        },
        include: {
          item: true,
        },
      });

      console.log('itemsShared', itemsShared);

      const itemFileIds = [];
      const itemFolderIds = [];


      await Promise.all(itemsShared.map(async (element) => {
        const file = await this.prisma.file.findUnique({
          where: {
            itemId: element.itemId,
          },
        });

        if (file) {
          console.log('sono un file : ', element);
          console.log('con Id:', file.itemId);
          itemFileIds.push(file.itemId);
        } else {
          console.log('sono una cartella : ', element);
          console.log('con Id:', element.id);
          itemFolderIds.push(element.id);
        }
      }));

      const itemsFolder = await this.prisma.item.findMany({
        where: {
          id: {
            in: itemFolderIds,
          }
        },
      });

      const itemsFile = await this.prisma.file.findMany({
        where: {
          itemId: {
            in: itemFileIds,
          },
        },
      });


      return {
        folders: itemsFolder,
        files: itemsFile,
      };

    } catch (error) {
      throw error;
    }
  }


  async singleItemShared(id: string, user: User) {
    if (!id) {
      throw new ForbiddenException('Id is required');
    }

    try {
      const item = await this.prisma.shared.findUnique({
        where: {
          id: parseInt(id), sharedWith: {
            is: {
              id: user.id,
            }
          }
        },
      });
      return item;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // record not found error
          throw new ForbiddenException('Item not found');
        }
      }
      throw error;
    }
  }

}