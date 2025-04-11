import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonagemController } from './personagem.controller';
import { PersonagemService } from './personagem.service';
import { Personagem, PersonagemSchema } from './schemas/personagem.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Personagem.name, schema: PersonagemSchema },
    ]),
  ],
  controllers: [PersonagemController],
  providers: [PersonagemService]
})
export class PersonagemModule {}
