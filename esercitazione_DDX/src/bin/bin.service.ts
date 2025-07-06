import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BinService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBinDto, user: User) {
    try {
      if (dto.itemId == null || dto.itemId === '') {
        throw new Error('Item ID is required');
      }

      const bin = await this.prisma.bin.create({
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

  findAll(user: User) {
    try {
      return this.prisma.bin.findMany({
        where: { userId: user.id },
        include: { item: true },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record to delete does not exist
          throw new ForbiddenException('Bin not found');
        }
      }
      throw error;
    }
  }

  findOne(id: number, user: User) {
    try {
      return this.prisma.bin.findUnique({
        where: { id, userId: user.id },
        include: { item: true },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record to delete does not exist
          throw new ForbiddenException('Bin not found');
        }
      }
      throw error;
    }
  }

  update(id: number, updateBinDto: UpdateBinDto, user: User) {
    return `This action updates a #${id} bin for user ${user.id}`;
  }

  remove(id: number, user: User) {
    try {
      this.prisma.bin.delete({
        where: { id, userId: user.id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          // Record to delete does not exist
          throw new ForbiddenException('Bin not found');
        }
      }
      throw error;
    }
  }
}
