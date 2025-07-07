import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BinService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateBinDto, user: User) {
    try {
      if (dto.itemId == null || dto.itemId === '') {
        throw new Error('Item ID is required');
      }


      const favorite = await this.prisma.favorite.findUnique({
        where: { userId_itemId: { userId: user.id, itemId: parseInt(dto.itemId) } },
      });

      if (favorite) {
        await this.prisma.favorite.delete({
          where: { userId_itemId: { userId: user.id, itemId: parseInt(dto.itemId) } },
        });

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

  async findAll(user: User) {
    try {
      const bins = await this.prisma.bin.findMany({
        where: { userId: user.id },
        include: { item: true },
      });

      const binItemIds = bins.map(bin => bin.itemId);

      const files = await this.prisma.file.findMany({
        where: { itemId: { in: binItemIds } },
        include: { item: true },
      });

      const fileBinItemIds = new Set(files.map(file => file.itemId));

      const folderBins = bins
        .filter(bin => !fileBinItemIds.has(bin.itemId))
        .map(bin => ({
          ...bin.item,
          isInBin: true,
        }));

      const fileBins = bins
        .filter(bin => fileBinItemIds.has(bin.itemId))
        .map(bin => {
          const fileData = files.find(file => file.itemId === bin.itemId);
          return {
            ...fileData,
            isInBin: true,
          };
        });

      return { folders: folderBins, files: fileBins };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ForbiddenException('Bin not found');
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
      return this.prisma.bin.delete({
        where: { userId_itemId: { userId: user.id, itemId: id } },
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
