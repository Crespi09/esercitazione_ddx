import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { FileModule } from './file/file.module';
import { SharedModule } from './shared/shared.module';
import { StorageModule } from './storage/storage.module';
import { FavoriteModule } from './favorite/favorite.module';
import { BinModule } from './bin/bin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // serve per caricare .evn file nel progetto
    AuthModule,
    UserModule,
    ItemModule,
    FileModule,
    SharedModule,
    StorageModule,
    FavoriteModule,
    BinModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
