import { Module } from "@nestjs/common";
import { FolderController } from "./item.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [FolderController],
    providers: []
})
export class FolderModule { }