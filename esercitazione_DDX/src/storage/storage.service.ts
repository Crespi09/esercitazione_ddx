import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { elementAt } from 'rxjs';

@Injectable({})
export class StorageService {
  constructor(private prisma: PrismaService) {}

  async userStorage(user: User) {
    const result = await this.prisma.file.aggregate({
      _sum: {
        storage: true,
      },
      where: {
        item: {
          ownerId: user.id,
        },
      },
    });

    return {
      message: 'Total Storage used',
      storage: result._sum.storage,
    };
  }
}
