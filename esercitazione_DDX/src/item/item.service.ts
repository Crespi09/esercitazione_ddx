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
      if (dto.parentId) {
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
      return items;
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
}
