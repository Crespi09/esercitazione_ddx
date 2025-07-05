import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

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
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  findAll(user: User) {
    try {
      return this.prisma.favorite.findMany({
        where: { userId: user.id },
        include: { item: true },
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

  findOne(id: number, user: User) {
    try {
      return this.prisma.favorite.findUnique({
        where: { id, userId: user.id },
        include: { item: true },
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

  update(id: number, updateFavoriteDto: UpdateFavoriteDto, user: User) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number, user: User) {
    try {
      return this.prisma.favorite.delete({
        where: { id, userId: user.id },
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
}
