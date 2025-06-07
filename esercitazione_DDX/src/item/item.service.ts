import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FolderDto } from "./dto/item.dto";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class FolderService {
    constructor(private prisma: PrismaService) { }


    async createItem(dto: FolderDto, user: User) {
        try {
            const item = await this.prisma.item.create({
                data: {
                    name: dto.name,
                    color: dto.color,
                    owner: { connect: { id: user.id } },

                    createdAt: new Date(),
                    updatedAt: new Date()

                }
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // duplicated fields error
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }

    async updateItem(id: string, dto: FolderDto) {

        if (!id) {
            throw new ForbiddenException('Id is required');
        }

        if (!dto.name || !dto.color) {
            throw new ForbiddenException('Name and color are required');
        }

        try {
            const item = await this.prisma.item.update({
                where: { id: parseInt(id) },
                data: {
                    name: dto.name,
                    color: dto.color,
                    updatedAt: new Date()
                }
            })
            return item;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') { // record not found error
                    throw new ForbiddenException('Item not found')
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
                where: { id: parseInt(id) }
            })
            return item;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') { // record not found error
                    throw new ForbiddenException('Item not found')
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
                orderBy: { createdAt: 'desc' }
            })
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
                where: { id: parseInt(id) }
            })
            return item;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') { // record not found error
                    throw new ForbiddenException('Item not found')
                }
            }
            throw error;
        }
    }

}