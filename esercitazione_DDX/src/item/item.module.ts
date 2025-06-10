import { Module } from "@nestjs/common";
import { ItemController } from "./item.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ItemService } from "./item.service";

@Module({
    imports: [PrismaModule],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule { }