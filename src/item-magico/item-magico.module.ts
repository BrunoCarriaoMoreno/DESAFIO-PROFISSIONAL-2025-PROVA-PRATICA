import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemMagicoService } from './item-magico.service';
import { ItemMagicoController } from './item-magico.controller';
import { ItemMagico, ItemMagicoSchema } from './schemas/item-magico.schema';
import { Mongoose } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: ItemMagico.name, schema: ItemMagicoSchema
    },
  ]),
  ],
  providers: [ItemMagicoService],
  controllers: [ItemMagicoController]
})
export class ItemMagicoModule {}
