import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";

@Module({
    imports: [PrismaModule],
    controllers: [StorageController],
    providers: [StorageService]
})
export class StorageModule { }