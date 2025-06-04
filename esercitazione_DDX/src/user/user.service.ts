import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Trova un utente in base all'ID
   */
  async findUserById(userId: number): Promise<User> {
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

  /**
   * Aggiorna i dati dell'utente
   */
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

  /**
   * Elimina un utente e tutte le sue relazioni a cascata
   */
  async deleteUser(userId: number): Promise<void> {
    await this.findUserById(userId);

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

}