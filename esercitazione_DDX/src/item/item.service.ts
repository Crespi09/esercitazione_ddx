import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/item.dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable({})
export class ItemService {
  constructor(private prisma: PrismaService) { }

  async createItem(dto: ItemDto, user: User) {
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

      const item = await this.prisma.item.create({
        data: {
          name: dto.name,
          color: dto.color,
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // duplicated fields error
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async updateItem(id: string, dto: UpdateItemDto, user: User) {
    const parentId = parseInt(dto.parentId);

    if (!id) {
      throw new ForbiddenException('Id is required');
    }

    if (!dto.name && !dto.color && !parentId) {
      throw new ForbiddenException('Name, color or parentId are required');
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


    try {
      const item = await this.prisma.item.update({
        where: { id: parseInt(id) },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.color && { color: dto.color }),
          ...(parentId && {
            parent: { connect: { id: parentId } },
          }),
          updatedAt: new Date(),
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

  async deleteItem(id: string, user: User) {
    if (!id) {
      throw new ForbiddenException('Id is required');
    }

    try {
      const item = await this.prisma.item.delete({
        where: {
          id: parseInt(id), owner: {
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

  async allItems(limit: number, offset: number, user: User) {
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

      andare a prendere tutti gli item dell'utente in base al limit e offset

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
      const items = await this.prisma.item.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        where: {
          owner: {
            is: {
              id: user.id,
            }
          }
        },
      });

      const itemFileIds = [];
      const itemFolderIds = [];

      // Usa Promise.all con map invece di forEach
      await Promise.all(items.map(async (element) => {
        const file = await this.prisma.file.findUnique({
          where: {
            itemId: element.id,
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
          },
          owner: {
            is: {
              id: user.id,
            }
          }
        },
      });

      console.log('itemFileIds', itemFileIds);
      console.log('itemFolderIds', itemFolderIds);

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

  async singleItem(id: string, user: User) {
    if (!id) {
      throw new ForbiddenException('Id is required');
    }
    
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: parseInt(id),
          ownerId: user.id
        },
      });
      const itemSons = await this.prisma.item.findMany({
        where: {
          parentId: parseInt(id),
          ownerId: user.id,
        },
      });

      const childrenFile = await this.prisma.file.findMany({
        where: {
          itemId: {
            in: itemSons.map((son) => son.id),
          },
        },
      });

      const childrenFolder = itemSons.filter(son => !childrenFile.some(file => file.itemId === son.id));

      return {
        item,
        children: {
          files: childrenFile,
          folders: childrenFolder,
        },
      };


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
