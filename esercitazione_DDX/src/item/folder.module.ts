import { Module } from "@nestjs/common";
import { FolderController } from "./folder.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports : [PrismaModule],
    controllers: [FolderController],
    providers: []
})
export class FolderModule{}