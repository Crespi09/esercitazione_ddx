import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/item.dto';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable({})
export class ItemService {
  constructor(private prisma: PrismaService) {}

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

  async updateItem(id: string, dto: UpdateItemDto) {
    if (!id) {
      throw new ForbiddenException('Id is required');
    }

    if (!dto.name && !dto.color && !dto.parentId) {
      throw new ForbiddenException('Name, color or parentId are required');
    }

    try {
      const item = await this.prisma.item.update({
        where: { id: parseInt(id) },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.color && { color: dto.color }),
          ...(dto.parentId && {
            parent: { connect: { id: parseInt(dto.parentId) } },
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

  async deleteItem(id: string) {
    if (!id) {
      throw new ForbiddenException('Id is required');
    }

    try {
      const item = await this.prisma.item.delete({
        where: { id: parseInt(id) },
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

  async allItems(limit: number, offset: number) {
    if (!limit || !offset) {
      throw new ForbiddenException('Limit and offset are required');
    }

    try {
      const items = await this.prisma.item.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      });
      return items;
    } catch (error) {
      throw error;
    }
  }

  async singleItem(id: string) {
    if (!id) {
      throw new ForbiddenException('Id is required');
    }

    try {
      const item = await this.prisma.item.findUnique({
        where: { id: parseInt(id) },
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
