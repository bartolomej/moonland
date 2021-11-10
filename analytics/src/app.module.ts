import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { typeorm } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(typeorm)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
