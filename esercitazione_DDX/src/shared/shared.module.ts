import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SharedController } from "./shared.controller";
import { SharedService } from "./shared.service";

@Module({
    imports: [PrismaModule],
    controllers: [SharedController],
    providers: [SharedService]
})
export class SharedModule {}