import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // serve per caricare .evn file nel progetto
    AuthModule, 
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
