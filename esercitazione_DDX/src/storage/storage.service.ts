import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { elementAt } from 'rxjs';

@Injectable({})
export class StorageService {
    constructor(private prisma: PrismaService) { }


    // TODO - per adesso non calcola il peso dei file che sono stati condivisi
    async userStorage(user: User) {
        /*
            vado a prendere gli id degli item con ownserId = user.id
            poi controllo la lista degli id nei file e prendo lo storage

        */

        var storageUsed = 0;

        const items = await this.prisma.item.findMany({
            where: {
                owner: {
                    is: {
                        id: user.id
                    }
                }
            }
        });

        await Promise.all(items.map(async (element) => {
            const file = await this.prisma.file.findUnique({
                where: {
                    itemId: element.id
                }
            });

            if (file) {
                storageUsed += file.storage;
            }
        }));

        return {
            message: 'Total Storage used',
            storage: storageUsed,
        };
    }

}