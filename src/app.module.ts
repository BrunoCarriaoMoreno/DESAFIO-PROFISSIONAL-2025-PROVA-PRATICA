import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonagemModule } from './personagem/personagem.module';
import { Mongoose } from 'mongoose';
import { ItemMagicoModule } from './item-magico/item-magico.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/personagem-db'),
    PersonagemModule,
    ItemMagicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
