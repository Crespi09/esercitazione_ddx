import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ShareDto } from './dto/share.dto';

@Injectable({})
export class SharedService {
  constructor(private prisma: PrismaService) { }


  async addShareItem(dto: ShareDto, user: User) {

    if(!dto.item_id || !dto.shared_with_id) {
      throw new ForbiddenException('item_id e shared_with_id sono obbligatori');
    }

    try {

        const itemId = parseInt(dto.item_id);
        if (isNaN(itemId)) {
            throw new ForbiddenException('item_id deve essere un numero valido');
        }
    
        const itemExists = await this.prisma.item.findUnique({
            where: { id: itemId },
        });
    
        if (!itemExists) {
            throw new NotFoundException(`Item con ID ${itemId} non trovato`);
        }
    
        // Verifica che l'utente sia proprietario dell'item
        if (itemExists.ownerId !== user.id) {
            throw new ForbiddenException('Non hai i permessi per condividere questo item');
        }
    
        const sharedWithId = parseInt(dto.shared_with_id);
        if (isNaN(sharedWithId)) {
            throw new ForbiddenException('shared_with_id deve essere un numero valido');
        }

        const share = await this.prisma.shared.create({
            data: {
            item: { connect: { id: itemId } },
            sharedWith: { connect: { id: sharedWithId } },
            createdAt: new Date(),
            updatedAt: new Date(),
            },
        });
    
        return share;

    }catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Condivisione già esistente');
        }
      }
      throw error;
    }

  }

  async removeShareItem(sharedId : string , user : User){
    const shared = await this.prisma.shared.findUnique({
      where : { id: parseInt(sharedId) }
    });

    if(!shared) {
      throw new NotFoundException('Condivisione non trovata');
    }

    const item = await this.prisma.item.findUnique({
      where: { id: shared.itemId }
    });

    if (shared.sharedWithId !== user.id && item.ownerId !== user.id) {
      throw new ForbiddenException('Non hai i permessi per rimuovere questa condivisione');
    }
    
    await this.prisma.shared.delete({
      where: { id: parseInt(sharedId) }
    });

    return HttpStatus.NO_CONTENT;

  }

}