import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { extname } from 'path';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads', // directory dove salvare i file
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
        }),
        PrismaModule
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule { }
