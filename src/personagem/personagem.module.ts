import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonagemController } from './personagem.controller';
import { PersonagemService } from './personagem.service';
import { Personagem, PersonagemSchema } from './schemas/personagem.schema';
import { ItemMagico, ItemMagicoSchema } from 'src/item-magico/schemas/item-magico.schema';
import { ItemMagicoModule } from 'src/item-magico/item-magico.module'; // importando o módulo item magico


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Personagem.name, schema: PersonagemSchema },
      { name: ItemMagico.name, schema: ItemMagicoSchema },
    ]),
    ItemMagicoModule,
  ],
  controllers: [PersonagemController],
  providers: [PersonagemService]
})
export class PersonagemModule {}
