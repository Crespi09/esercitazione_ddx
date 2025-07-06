import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateFavoriteDto, user: User) {
    try {
      if (dto.itemId == null || dto.itemId === '') {
        throw new Error('Item ID is required');
      }

      const favorite = await this.prisma.favorite.create({
        data: {
          itemId: parseInt(dto.itemId),
          userId: user.id,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // duplicated fields error
          throw new ForbiddenException('Elements already exist');
        }
      }
      throw error;
    }
  }

  async findAll(user: User) {
    try {
      const favorites = await this.prisma.favorite.findMany({
        where: { userId: user.id },
        include: { item: true },
      });

      const favoriteItemIds = favorites.map(fav => fav.itemId);

      const files = await this.prisma.file.findMany({
        where: {
          itemId: { in: favoriteItemIds },
        },
        include: { item: true },
      });

      const fileFavoriteIds = new Set(files.map(file => file.itemId));

      const folderFavorites = favorites
        .filter(fav => !fileFavoriteIds.has(fav.itemId))
        .map(fav => ({
          ...fav.item,
          isFavourite: true,
        }));

      const fileFavorites = favorites
        .filter(fav => fileFavoriteIds.has(fav.itemId))
        .map(fav => {
          const fileData = files.find(file => file.itemId === fav.itemId);
          return {
            ...fileData,
            isFavourite: true,
          };
        });

      return { folders: folderFavorites, files: fileFavorites };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record to delete does not exist
          throw new ForbiddenException('Favorite not found');
        }
      }
      throw error;
    }
  }

  findOne(id: number, user: User) {
    try {
      return this.prisma.favorite.findUnique({
        where: { id, userId: user.id },
        include: { item: true },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record to delete does not exist
          throw new ForbiddenException('Favorite not found');
        }
      }
      throw error;
    }
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto, user: User) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number, user: User) {
    try {
      return this.prisma.favorite.delete({
        where: { userId_itemId: { userId: user.id, itemId: id } },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record to delete does not exist
          throw new ForbiddenException('Favorite not found');
        }
      }
      throw error;
    }
  }
}
