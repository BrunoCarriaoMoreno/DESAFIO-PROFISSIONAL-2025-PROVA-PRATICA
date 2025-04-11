import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum TipoItemMagico {
    ARMA = 'Arma',
    ARMADURA = 'Armadura',
    AMULETO = 'Amuleto',
}

@Schema()
export class ItemMagico {
    @Prop({ required: true })
    nome: string;

    @Prop({ required: true, enum: TipoItemMagico })
    tipo: TipoItemMagico;

    @Prop({ required: true, min: 0, max: 10 })
    forca: number

    @Prop({ required: true, min: 0, max: 10 })
    defesa: number;
}

export type ItemMagicoDocument = ItemMagico & Document;

export const ItemMagicoSchema = SchemaFactory.createForClass(ItemMagico);