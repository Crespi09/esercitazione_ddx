import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`Utente con ID ${userId} non trovato`);
    }

    return user;
  }

  async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
    // Verifica se l'utente esiste
    await this.findUserById(userId);

    // Aggiorna l'utente
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.findUserById(userId);

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async getItemsCount(userId: number): Promise<JsonValue> {

    await this.findUserById(userId);

    const totalItems = await this.prisma.item.count({
      where: {
        ownerId: userId,
      }
    });

    const nFiles = await this.prisma.item.count({
      where: {
        ownerId: userId,
        file: {
          isNot: null
        }
      }
    })

    const nFolder = totalItems - nFiles;

    return {
      totalItems,
      nFolder,
      nFiles
    }
  }

}